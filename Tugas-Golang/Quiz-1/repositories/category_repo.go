package repositories

import (
	"context"
	"database/sql"
	"errors"
	"fmt"
	"log"
	"time"

	"tugas-quiz-1-sb-sanbercode/config"
	"tugas-quiz-1-sb-sanbercode/models"
	"tugas-quiz-1-sb-sanbercode/utils"
)

const (
	tableCategory = "category"
)

// GetAll
func GetAllCategory(ctx context.Context) ([]models.Category, error) {
	var categories []models.Category
	db, err := config.ConnectDB()

	if err != nil {
		log.Fatal("Cant connect to Database", err)
	}

	queryText := fmt.Sprintf("SELECT * FROM %v Order By created_at DESC", tableCategory)
	rowQuery, err := db.QueryContext(ctx, queryText)

	if err != nil {
		log.Fatal(err)
	}

	for rowQuery.Next() {
		var category models.Category
		var createdAt, updatedAt string
		if err = rowQuery.Scan(&category.ID,
			&category.Name,
			&createdAt,
			&updatedAt); err != nil {
			return nil, err
		}

		//  Change format string to datetime for created_at and updated_at
		category.CreatedAt, err = time.Parse(layoutDateTime, createdAt)

		if err != nil {
			log.Fatal(err)
		}

		category.UpdatedAt, err = time.Parse(layoutDateTime, updatedAt)
		if err != nil {
			log.Fatal(err)
		}

		categories = append(categories, category)
	}
	return categories, nil
}

// Get By Id Category
// func GetCategoryArticleByID(ctx context.Context, db *sql.DB, id string) (*models.CategoryArticle, error) {
// 	var category models.CategoryArticle
// 	var createdAt, updatedAt string

// 	query := `SELECT c.id, c.name, c.created_at, c.updated_at, a.id, a.title, a.content, a.image_url, a.article_length, a.created_at, a.updated_at, a.category_id
// 				FROM category c
// 				LEFT JOIN articles a ON c.id = a.category_id
// 				WHERE c.id = ?`

// 	rows, err := db.QueryContext(ctx, query, id)
// 	if err != nil {
// 		return nil, fmt.Errorf("can't execute query: %w", err)
// 	}
// 	defer rows.Close()

// 	for rows.Next() {
// 		var article models.Article
// 		var articleID, articleCategoryID sql.NullInt64
// 		var articleTitle, articleContent, articleImageURL, articleArticleLength sql.NullString
// 		var articleCreatedAt, articleUpdatedAt sql.NullString

// 		if err := rows.Scan(&category.ID, &category.NameCategory, &createdAt, &updatedAt,
// 			&articleID, &articleTitle, &articleContent, &articleImageURL, &articleArticleLength, &articleCreatedAt, &articleUpdatedAt, &articleCategoryID); err != nil {
// 			return nil, fmt.Errorf("can't scan result: %w", err)
// 		}

// 		if category.CreatedAt, err = time.Parse(layoutDateTime, createdAt); err != nil {
// 			return nil, fmt.Errorf("can't parse category created_at: %w", err)
// 		}
// 		if category.UpdatedAt, err = time.Parse(layoutDateTime, updatedAt); err != nil {
// 			return nil, fmt.Errorf("can't parse category updated_at: %w", err)
// 		}

// 		if articleID.Valid {
// 			article.ID = int(articleID.Int64)
// 			article.Title = articleTitle.String
// 			article.Content = articleContent.String
// 			article.ImageURL = articleImageURL.String
// 			article.ArticleLength = articleArticleLength.String
// 			article.CategoryID = int(articleCategoryID.Int64)

// 			if article.CreatedAt, err = time.Parse(layoutDateTime, articleCreatedAt.String); err != nil {
// 				return nil, fmt.Errorf("can't parse article created_at: %w", err)
// 			}
// 			if article.UpdatedAt, err = time.Parse(layoutDateTime, articleUpdatedAt.String); err != nil {
// 				return nil, fmt.Errorf("can't parse article updated_at: %w", err)
// 			}

// 			category.Article = append(category.Article, article)
// 		}
// 	}

// 	if err = rows.Err(); err != nil {
// 		return nil, fmt.Errorf("error iterating over rows: %w", err)
// 	}

// 	return &category, nil
// }

func GetByIdCategoryArticle(ctx context.Context, db *sql.DB, id string, filters map[string]interface{}, sortField, sortOrder string) (*models.CategoryArticle, error) {
	var category models.CategoryArticle
	var createdAt, updatedAt string

	baseQuery := `SELECT c.id, c.name, c.created_at, c.updated_at, a.id, a.title, a.content, a.image_url, a.article_length, a.created_at, a.updated_at, a.category_id 
	              FROM category c 
	              LEFT JOIN articles a ON c.id = a.category_id 
	              WHERE c.id = ?`

	filters["category_id"] = id // Menambahkan filter kategori ID
	query, args := utils.BuildFilter(baseQuery, filters, sortField, sortOrder)
	args = append([]interface{}{id}, args...)

	rows, err := db.QueryContext(ctx, query, args...)
	if err != nil {
		return nil, fmt.Errorf("can't execute query: %w", err)
	}
	defer rows.Close()

	for rows.Next() {
		var article models.Article
		var articleID, articleCategoryID sql.NullInt64
		var articleTitle, articleContent, articleImageURL, articleArticleLength sql.NullString
		var articleCreatedAt, articleUpdatedAt sql.NullString

		if err := rows.Scan(&category.ID, &category.NameCategory, &createdAt, &updatedAt,
			&articleID, &articleTitle, &articleContent, &articleImageURL, &articleArticleLength, &articleCreatedAt, &articleUpdatedAt, &articleCategoryID); err != nil {
			return nil, fmt.Errorf("can't scan result: %w", err)
		}

		if category.CreatedAt, err = time.Parse(layoutDateTime, createdAt); err != nil {
			return nil, fmt.Errorf("can't parse category created_at: %w", err)
		}
		if category.UpdatedAt, err = time.Parse(layoutDateTime, updatedAt); err != nil {
			return nil, fmt.Errorf("can't parse category updated_at: %w", err)
		}

		if articleID.Valid {
			article.ID = int(articleID.Int64)
			article.Title = articleTitle.String
			article.Content = articleContent.String
			article.ImageURL = articleImageURL.String
			article.ArticleLength = articleArticleLength.String
			article.CategoryID = int(articleCategoryID.Int64)

			if article.CreatedAt, err = time.Parse(layoutDateTime, articleCreatedAt.String); err != nil {
				return nil, fmt.Errorf("can't parse article created_at: %w", err)
			}
			if article.UpdatedAt, err = time.Parse(layoutDateTime, articleUpdatedAt.String); err != nil {
				return nil, fmt.Errorf("can't parse article updated_at: %w", err)
			}

			category.Article = append(category.Article, article)
		}
	}

	if err = rows.Err(); err != nil {
		return nil, fmt.Errorf("error iterating over rows: %w", err)
	}

	return &category, nil
}

// Insert Category
func InsertCategory(ctx context.Context, category models.Category) error {
	db, err := config.ConnectDB()
	if err != nil {
		log.Fatal("Can't connect to ConnectDB", err)
	}

	queryText := fmt.Sprintf("INSERT INTO %v (name, created_at, updated_at) values('%v', NOW(), NOW())", tableCategory, category.Name)

	_, err = db.ExecContext(ctx, queryText)
	if err != nil {
		return err
	}
	return nil
}

// Update Category
func UpdateCategory(ctx context.Context, category models.Category, id string) error {
	db, err := config.ConnectDB()
	if err != nil {
		log.Fatal("Can't connect to ConnectDB", err)
	}

	queryText := fmt.Sprintf("UPDATE %v set name ='%s', updated_at = NOW() where id = %s",
		tableCategory,
		category.Name,
		id,
	)

	_, err = db.ExecContext(ctx, queryText)
	if err != nil {
		return err
	}

	return nil
}

// Delete Category
func DeleteCategory(ctx context.Context, id string) error {
	db, err := config.ConnectDB()
	if err != nil {
		log.Fatal("Can't connect to ConnectDB", err)
	}

	queryText := fmt.Sprintf("DELETE FROM %v where id = %s", tableCategory, id)

	s, err := db.ExecContext(ctx, queryText)

	if err != nil && err != sql.ErrNoRows {
		return err
	}

	check, err := s.RowsAffected()
	fmt.Println(check)
	if check == 0 {
		return errors.New("id tidak ada")
	}

	if err != nil {
		fmt.Println(err.Error())
	}

	return nil
}
