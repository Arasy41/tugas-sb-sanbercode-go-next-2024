import React, { useContext } from 'react';
import { AiOutlineDown, AiOutlineUp } from 'react-icons/ai';
import CulinaryReviewContext from '../../contexts/CulinaryReviewContext';

const Faq = () => {

  const { openFaq, setOpenFaq } = useContext(CulinaryReviewContext)

  const faqs = [
    {
      question: 'What is Culinary Recipe?',
      answer: 'Culinary Recipe is an online platform that allows you to discover, share, and save your favorite recipes. You can also read reviews and see ratings from other users.',
    },
    {
      question: 'How can I search for recipes?',
      answer: 'You can use the search bar on the homepage to search for recipes by title or ingredients. You can also browse through different categories to find what you are looking for.',
    },
    {
      question: 'How do I save a recipe to my favorites?',
      answer: 'To save a recipe to your favorites, you need to be logged in. Simply click the heart icon on the recipe, and it will be added to your favorite recipes.',
    },
    {
      question: 'Can I share my own recipes?',
      answer: 'Yes, you can share your own recipes by creating an account and clicking on the "Add Recipe" button. Fill in the required details and submit your recipe for others to enjoy.',
    },
    {
      question: 'How can I leave a review for a recipe?',
      answer: 'You need to be logged in to leave a review. Go to the recipe you want to review and click on the "Leave a Review" button. Write your review and submit it.',
    },
    {
      question: 'How do I change my account settings?',
      answer: 'To change your account settings, go to your profile page and click on the "Settings" button. Here, you can update your personal information, change your password, and manage your preferences.',
    },
  ];

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="container mx-auto mt-16 px-4 py-8 text-center md:text-left md:px-8 md:py-16 dark:bg-gray-900 dark:text-white dark:border-gray-700">
      <h1 className="text-4xl font-bold text-left mb-8">Frequently Asked Questions</h1>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div key={index} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md transition-all duration-200">
            <div className="flex justify-between items-center cursor-pointer" onClick={() => toggleFaq(index)}>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">{faq.question}</h2>
              {openFaq === index ? <AiOutlineUp size={24} /> : <AiOutlineDown size={24} />}
            </div>
            {openFaq === index && (
              <p className="mt-4 text-gray-700 dark:text-gray-300">{faq.answer}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Faq;
