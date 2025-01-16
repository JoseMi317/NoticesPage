'use client';

import React, { useState, useEffect } from "react";
import { fetchNews } from "../services/ApiService";

interface ApiData {
  title: string;
  description: string;
  author: string;
  url: string;
  urlToImage: string;
}

interface NoticeInfoComponentProps {
  selectedCategory: string;
  selectedLanguaje: string;
}

const NoticeInfoComponent: React.FC<NoticeInfoComponentProps> = ({ selectedCategory }) => {
  const [articles, setArticles] = useState<ApiData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getArticles = async () => {
      try {
        const data = await fetchNews(selectedCategory);
        setArticles(data);
      } catch (err) {
        setError("Error al obtener las noticias");
      } finally {
        setLoading(false);
      }
    };

    getArticles();
  }, [selectedCategory]);


  if (loading) {
    return <p className="text-xl font-bold">Cargando... <span className="loading loading-bars loading-lg"></span></p>;
  }

  if (error) {
    return <div role="alert" className="alert alert-error w-96">
              <span>{error}</span>
            </div>;
  }


  if (articles.length === 0) {
    return <p className="text-3xl font-sans font-bold p-6 text-black">There is no news available for this category.</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {articles.map((article, index) => (
        <div key={index} className="card bg-base-100 w-full shadow-xl">
          <figure>
            <img
              src={article.urlToImage || "/NewNotice.png"}
              alt={article.title || "Imagen no disponible"}
              className="w-full h-48 object-cover"
            />
          </figure>
          <div className="card-body">
            <h2 className="card-title">{article.title || "Título no disponible"}</h2>
            <p>{article.description || "Descripción no disponible"}</p>
            <div className="card-actions justify-between h-10">
              <div className="badge badge-accent h-full w-auto max-w-96">
                Author: {article.author || ""}
              </div>
              <a href={article.url} className="badge badge-info btn btn-md">
                Ver más
              </a>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default NoticeInfoComponent;
