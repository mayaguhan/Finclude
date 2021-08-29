<template>
    <v-container>
        <v-row class="mt-5 blue lighten-5" id="aboutFadeIn" style="border-radius: 40px">
            <v-col>
                <img src="https://tinmansachs.s3.amazonaws.com/About.jpg" style="height: 300px; border-radius: 20px">
            </v-col>
            <v-col>
                <div class="mt-10" id="description1">
                    <div>
                        <h1>
                            About <span style="font-style: italic">Finclude</span>
                        </h1>
                    </div>
                    <div>
                        <p>
                            At Tinman Sachs, we believe that useful financial products and services that meets the needs of the people should be available for all. Not just for the rich nor the highly connected people, but for every single person. Thus, we began to start our first step towards our financially inclusive vision with Finclude. Although simple, Finclude helps connect the people who need financial advice and planning the most with people who are able to provide it. <br><br> Join us in taking steps towards the greater good, use <b>Finclude</b>! 
                            <br>
                            <br>
                        </p>
                    </div>
                </div>

            </v-col>
        </v-row>


        <div id="restFadeIn" class="mt-8 typewriter">
            <h1 :style="styleObjTitle">Let's Get Started....</h1>
        </div>
        <v-row id="restFadeIn" @mouseover="showTitle()">
            <v-col style=" text-align: center; margin: auto">
                <img class="main_img" src="../../public/assets/amy-hirschi-JaoVGh5aJ3E-unsplash.jpg" style="height: 500px; border-radius: 10px;">
            </v-col>
            <v-col>
                <v-row id="user">
                    <v-col class="mt-4">
                        <img src="../../public/assets/businessman.png" style="height: 175px">
                        <router-link to="/probonoform" style="text-decoration: none">
                            <v-btn text>
                                I want to be a pro-bono advisor!
                            </v-btn>
                        </router-link>
                    </v-col>
                </v-row>
                <v-row id="user">
                    <v-col class="mt-2">
                        <img src="../../public/assets/thinking.jpg" style="height: 175px">

                        <router-link to="/userform" style="text-decoration: none">
                            <v-btn text>
                                I want to be financially savvy!
                            </v-btn>
                        </router-link>
                    </v-col>
                </v-row>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
export default {
    name: "Homepage",
    data() {
        return {
            styleObjTitle: {
                color: "#580057",
                fontSize: "75px",
                display: "none"
            }
        }
    },
    methods: {
        showTitle(){
            this.styleObjTitle.display = "block";
        }
    },
    computed: {
        //
    },
    created() {
        //
    }

}
</script>

<style>
#user {
    text-align: center;
    align-content: center;
    margin: auto;
}

#aboutFadeIn {
    animation: fadein 2s;
}

#restFadeIn {
    animation: restfadein 5s;
}

@keyframes fadein {
    from { opacity: 0; }
    to   { opacity: 1; }
}

@keyframes restfadein {
    from { opacity: 0; }
    to   { opacity: 1; }
}

.typewriter h1 {
  color: #fff;
  font-family: monospace;
  overflow: hidden; /* Ensures the content is not revealed until the animation */
  border-right: .15em solid orange; /* The typwriter cursor */
  white-space: nowrap; /* Keeps the content on a single line */
  margin: 0 auto; /* Gives that scrolling effect as the typing happens */
  letter-spacing: .1em; /* Adjust as needed */
  animation: 
    typing 3.5s steps(30, end),
    blink-caret .5s step-end infinite;
}

/* The typing effect */
@keyframes typing {
  from { width: 0 }
  to { width: 100% }
}

/* The typewriter cursor effect */
@keyframes blink-caret {
  from, to { border-color: transparent }
  50% { border-color: orange }
}
</style>