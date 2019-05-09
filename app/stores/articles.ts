import { writable } from 'svelte/store'
import { client } from '../lib/client'
import { Article } from '../models/article'

export enum ArticleFilterType {
    Global = "global",
    Feed = "feed",
    Tag = "tag",
    Favorited = "favorited",
    Author = "author"
}

export interface ArticleResponse {
    articles: Article[],
    articlesCount: number
}

export interface SingleArticleResponse {
    article: Article
}

const ARTICLES_PER_PAGE = 20;

export class ArticleStore {
    articles: any;
    per_page = 20;
    page = -1;

    filter_type:ArticleFilterType = null;
    filter_param:string = null;
    user_token: string = null;

    constructor() {
        this.articles = writable([]);
    }

    subscribe = (action) => {
        return this.articles.subscribe(action);
    };
    

    private async loadPage(page: number, filter_type: ArticleFilterType, filter_param: string, user_token: string) {
        let url = '/articles'
        const encoded_param = encodeURIComponent(filter_param)
        switch (filter_type) {
            case ArticleFilterType.Author: url += `?author=${encoded_param}&`; break;
            case ArticleFilterType.Favorited: url += `?favorited=${encoded_param}&`; break;
            case ArticleFilterType.Tag: url += `?tag=${encoded_param}&`; break;
            case ArticleFilterType.Global: url += '?'; break;
            case ArticleFilterType.Feed: url += '/feed?'
        }
        url += `offset=${page * ARTICLES_PER_PAGE}&limit=${ARTICLES_PER_PAGE}`
        let response = await client.sendRequest<ArticleResponse>(url,'get', user_token)
        
        this.filter_type = filter_type;
        this.filter_param = filter_param;
        this.page = page;
        this.user_token = user_token;

        if (this.page == 0) {
            this.articles.set(response.articles)
        } else {
            this.articles.update(articles => [...articles, ...response.articles])
        }
    }

    loadArticles(filter_type: ArticleFilterType, filter_param: string, user_token: string = null) {
        return this.loadPage(0, filter_type, filter_param, user_token);
    }

    loadNextPage() {
        return this.loadPage(this.page + 1, this.filter_type, this.filter_param, this.user_token)
    }

    async favoriteArticle(article:Article, user_token: string) {
        let res = await client.sendRequest<SingleArticleResponse>(`/articles/${article.slug}/favorite`,'POST', user_token);
        this.articles.update(a => a.map(x => (x.slug == res.article.slug) ? res.article : x))
        return res.article;
    }

    async unFavoriteArticle(article:Article, user_token: string) {
        let res = await client.sendRequest<SingleArticleResponse>(`/articles/${article.slug}/favorite`,'DELETE', user_token);
        this.articles.update(a => a.map(x => (x.slug == res.article.slug) ? res.article : x))
        return res.article;
    }
}



