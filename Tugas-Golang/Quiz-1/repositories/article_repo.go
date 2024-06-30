package repositories

import (
	"context"
	"database/sql"
	"errors"
	"fmt"
	"time"
	"tugas-quiz-1-sb-sanbercode/config"
	"tugas-quiz-1-sb-sanbercode/models"
	"tugas-quiz-1-sb-sanbercode/utils"
)

const (
	tableArticle   = "articles"
	layoutDateTime = "2006-01-02 15:04:05"
)

// GetAllArticle retrieves all articles from the database
func GetAllArticles(ctx context.Context, filters map[string]interface{}, sortField, sortOrder string) ([]models.Article, error) {
	db, err := config.ConnectDB()
	if err != nil {
		return nil, fmt.Errorf("can't connect to database: %w", err)
	}
	defer db.Close()

	baseQuery := fmt.Sprintf("SELECT * FROM %s", tableArticle)
	query, args := utils.BuildFilter(baseQuery, filters, sortField, sortOrder)

	rows, err := db.QueryContext(ctx, query, args...)
	if err != nil {
		return nil, fmt.Errorf("failed to execute query: %w", err)
	}
	defer rows.Close()

	var articles []models.Article
	for rows.Next() {
		var article models.Article
		var createdAt, updatedAt string
		err := rows.Scan(&article.ID, &article.Title, &article.Content, &article.ImageURL, &article.ArticleLength, &createdAt, &updatedAt, &article.CategoryID)
		if err != nil {
			return nil, fmt.Errorf("failed to scan article row: %w", err)
		}

		article.CreatedAt, err = time.Parse(layoutDateTime, createdAt)
		if err != nil {
			return nil, fmt.Errorf("failed to parse created_at: %w", err)
		}

		article.UpdatedAt, err = time.Parse(layoutDateTime, updatedAt)
		if err != nil {
			return nil, fmt.Errorf("failed to parse updated_at: %w", err)
		}

		articles = append(articles, article)
	}

	return articles, nil
}

// GetArticleByID retrieves a single article by its ID from the database
func GetArticleByID(ctx context.Context, id int) (*models.Article, error) {
	db, err := config.ConnectDB()
	if err != nil {
		return nil, fmt.Errorf("can't connect to database: %w", err)
	}
	defer db.Close()

	var article models.Article
	var createdAt, updatedAt string

	stmt, err := db.Prepare("SELECT * FROM articles WHERE id = ?")
	if err != nil {
		return nil, err
	}
	defer stmt.Close()

	err = stmt.QueryRow(id).Scan(&article.ID, &article.Title, &article.Content, &article.ImageURL, &article.ArticleLength, &createdAt, &updatedAt, &article.CategoryID)
	if err != nil {
		if err == sql.ErrNoRows {
			return nil, nil
		}
		return nil, err
	}

	article.CreatedAt, err = time.Parse(layoutDateTime, createdAt)
	if err != nil {
		return nil, err
	}
	article.UpdatedAt, err = time.Parse(layoutDateTime, updatedAt)
	if err != nil {
		return nil, err
	}

	return &article, nil
}

// InsertArticle inserts a new article into the database
func InsertArticle(ctx context.Context, article models.Article) error {
	db, err := config.ConnectDB()
	if err != nil {
		return fmt.Errorf("can't connect to database: %w", err)
	}
	defer db.Close()

	queryText := fmt.Sprintf("INSERT INTO %v (title, content, image_url, article_length, category_id, created_at, updated_at) VALUES (?, ?, ?, ?, ?, NOW(), NOW())", tableArticle)
	_, err = db.ExecContext(ctx, queryText, article.Title, article.Content, article.ImageURL, article.ArticleLength, article.CategoryID)
	if err != nil {
		return err
	}

	return nil
}

// UpdateArticle updates an existing article in the database
func UpdateArticle(ctx context.Context, article models.Article) error {
	db, err := config.ConnectDB()
	if err != nil {
		return fmt.Errorf("can't connect to database: %w", err)
	}
	defer db.Close()

	queryText := fmt.Sprintf("UPDATE %v SET title = ?, content = ?, image_url = ?, article_length = ?, category_id = ?, updated_at = NOW() WHERE id = ?", tableArticle)
	_, err = db.ExecContext(ctx, queryText, article.Title, article.Content, article.ImageURL, article.ArticleLength, article.CategoryID, article.ID)
	if err != nil {
		return err
	}

	return nil
}

// DeleteArticle deletes an article from the database
func DeleteArticle(ctx context.Context, id int) error {
	db, err := config.ConnectDB()
	if err != nil {
		return fmt.Errorf("can't connect to database: %w", err)
	}
	defer db.Close()

	queryText := fmt.Sprintf("DELETE FROM %v WHERE id = ?", tableArticle)
	result, err := db.ExecContext(ctx, queryText, id)
	if err != nil {
		return err
	}

	rowsAffected, err := result.RowsAffected()
	if err != nil {
		return err
	}
	if rowsAffected == 0 {
		return errors.New("no article found with the given ID")
	}

	return nil
}
