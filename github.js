class GitHub {

    constructor() {
        this.config = {
            headers: {
            Authorization: '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'
            }
        }
        this.repos_count = 5;
        this.repos_sort = 'created: asc';

    }

    async getUser(userID) {

        let cachedUser = {};

        const profileResponse = await fetch(`https://api.github.com/users/${userID}`, this.config);

        const repoResponse = await fetch(`https://api.github.com/users/${userID}/repos?per_page=${this.repos_count}&sort=${this.repos_sort}`, this.config);

        const responses = await Promise.all([profileResponse, repoResponse])

        if(responses.every((res) => res.ok)) {
            const [profile, repo] = await Promise.all(responses.map(response => response.json())
            )

            cachedUser = {profile, repo};
        } else {
            cachedUser.message = 'User Not Found'
        }
    
        return cachedUser

    }
}