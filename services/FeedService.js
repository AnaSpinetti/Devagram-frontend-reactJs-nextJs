import HttpService from "./HttpService";

export default class FeedService extends HttpService{
    async loadPosts(idUser){
        let url = '/feed'
        if(idUser){
            url += `?id=${idUser}`
        }

        return this.get(url)
    }

    async commentpost(idPost, comment){
        const url = `/comment?id=${idPost}`
        if(!idPost) return;

        return await this.put(url, comment)

    }

    async toggleLike(idPost) {
        const url = `/like?id=${idPost}`
        if(!idPost) return;
        return await this.put(url)
    }
}