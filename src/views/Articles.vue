<template>
    <div style="text-align:center" class ="mt-3">
        <h1>Finance Articles</h1> 

        <v-container class="" grid-list-md>
            <v-layout row wrap>
                <v-flex v-for="article in articles" :key="article">
                    <v-hover>
                        <template v-slot:default="{ hover }">
                            <v-card
                            :loading="loading"
                            class="mx-auto my-12"
                            max-width="374"
                            :elevation="hover ? 24: 6"
                            >

                            <template slot="progress">
                            <v-progress-linear
                                color="deep-purple"
                                height="10"
                                indeterminate
                            ></v-progress-linear>
                            </template>

                            <v-img
                            height="250"
                            v-bind:src= "article.urlToImage">
                            </v-img>

                            
                            <v-card-text style="padding-bottom: 40px; color: black" >
                                <h2>{{article.title}}</h2>
                            </v-card-text>

                            <v-card-text>
                                <v-row
                                    align="center"
                                    class="mx-0"
                                >
                                </v-row>
                            
                            <div class="black--text">"{{article.description}}"</div>
                            </v-card-text>

                            <v-divider class="mx-4"></v-divider>

                            <v-card-actions class="justify-center">
                            
                            <v-dialog
                                transition="dialog-top-transition"
                                max-width="600"
                            >

                            <template v-slot:activator="{on, attrs }">
                                <v-btn 
                                    colors="primary"
                                    v-bind="attrs"
                                    @click="openArticle(article.url)"
                                > Read Full Article

                                </v-btn>
                            </template>

                            <!-- <template v-slot:default="dialog">
                                <v-card>
                                    <v-toolbar
                                    color="primary"
                                    dark
                                    > {{article.title}}
                                    </v-toolbar>
                                    <v-card-text>
                                        <div style ="padding-top:40px"> 123456 <b>{{ article.url}} </b></div>
                                    </v-card-text>
                                    <v-card-actions class="justify-end">

                                    <v-btn
                                        text
                                        @click="dialog.value= false"
                                    >Close</v-btn>
                                    </v-card-actions>
                                </v-card>
                            </template> -->
                            </v-dialog>
                            </v-card-actions>
                            </v-card>
                        </template>
                    </v-hover>
                </v-flex>
            </v-layout>
                    
        </v-container>

    </div>
</template>

<script>

export default {


    name: "Articles",
    data() {
        return {
            articles: [],
            message: "Hello"
        }
    },
    methods: {
        openArticle(url) {
            window.open(url);
        }
    },
    created() {
        ///
        const axios = require('axios');

        //Request to get articles
        axios.get('https://p8rst1e8a6.execute-api.us-east-1.amazonaws.com/production/getArticles')
            .then((response) => {
                //Success
                this.articles = response.data.Items;
                console.log(this.articles);
            })

            .catch(function (error) {
                //error
                console.log(error);
            })

            .then(function () {
            //     console.log(response);
                console.log("GET Request complete")
            });


    }
}
</script>

<style>

</style>