<script setup lang="ts">
const appName = ref<string>('Social Media RPG')

const {loadMe} = useAuth()

await loadMe()
</script>

<template>
    <div id="app">
        <NavigationBar />

        <div class="my-8"></div>

        <NuxtPage />
    </div>
</template>

<style>
.text-gold {
    color: gold;
    font-weight: bold;
}

.text-blue-500 {
    color: #3b82f6; /* Tailwind's blue-500 */
}

.animated-sparkle {
    color: #ffcc00;
    -webkit-animation: sparkle-animation 1.5s infinite;
    animation: sparkle-animation 1.5s infinite;
}

@-webkit-keyframes sparkle-animation {
    0%,
    100% {
        text-shadow:
            0 0 5px #ffcc00,
            0 0 10px #ffcc00;
    }
    50% {
        text-shadow:
            0 0 20px #ffcc00,
            0 0 30px #ffcc00;
    }
}

@keyframes sparkle-animation {
    0%,
    100% {
        text-shadow:
            0 0 5px #ffcc00,
            0 0 10px #ffcc00;
    }
    50% {
        text-shadow:
            0 0 20px #ffcc00,
            0 0 30px #ffcc00;
    }
}

/* Glühender Name */
.animated-glow {
    color: #00ffcc;
    text-shadow:
        0 0 5px #00ffcc,
        0 0 10px #00ffcc,
        0 0 15px #00ffcc;
    -webkit-animation: glow-animation 1.5s infinite alternate;
    animation: glow-animation 1.5s infinite alternate;
}

@-webkit-keyframes glow-animation {
    0% {
        text-shadow:
            0 0 5px #00ffcc,
            0 0 10px #00ffcc,
            0 0 15px #00ffcc;
    }
    100% {
        text-shadow:
            0 0 20px #00ffcc,
            0 0 30px #00ffcc,
            0 0 40px #00ffcc;
    }
}

@keyframes glow-animation {
    0% {
        text-shadow:
            0 0 5px #00ffcc,
            0 0 10px #00ffcc,
            0 0 15px #00ffcc;
    }
    100% {
        text-shadow:
            0 0 20px #00ffcc,
            0 0 30px #00ffcc,
            0 0 40px #00ffcc;
    }
}

/* Wellen Name */
.animated-wave {
    color: #ff6347;
    -webkit-animation: wave-animation 1.5s infinite;
    animation: wave-animation 1.5s infinite;
}

@-webkit-keyframes wave-animation {
    0% {
        -webkit-transform: translateY(0);
        transform: translateY(0);
    }
    50% {
        -webkit-transform: translateY(-5px);
        transform: translateY(-5px);
    }
    100% {
        -webkit-transform: translateY(0);
        transform: translateY(0);
    }
}

@keyframes wave-animation {
    0% {
        -webkit-transform: translateY(0);
        transform: translateY(0);
    }
    50% {
        -webkit-transform: translateY(-5px);
        transform: translateY(-5px);
    }
    100% {
        -webkit-transform: translateY(0);
        transform: translateY(0);
    }
}

/* Blitzender Name */
.animated-flash {
    color: #ffcc00;
    -webkit-animation: flash-animation 1s infinite;
    animation: flash-animation 1s infinite;
}

@-webkit-keyframes flash-animation {
    0%,
    100% {
        opacity: 1;
    }
    50% {
        opacity: 0.5;
    }
}

@keyframes flash-animation {
    0%,
    100% {
        opacity: 1;
    }
    50% {
        opacity: 0.5;
    }
}

/* Leuchtender Name mit Schatten */
.glow {
    color: #ffffff;
    text-shadow:
        0 0 5px #ffffff,
        0 0 10px #ffffff,
        0 0 15px #ff00ff,
        0 0 20px #ff00ff;
}

/* Schattierter Name */
.text-shadow {
    color: #4a5568;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
}

/* Neon Name */
.neon {
    color: #00ffcc;
    text-shadow:
        0 0 5px #00ffcc,
        0 0 10px #00ffcc,
        0 0 15px #00ffcc;
}

/* Farbverlauf Name */
.gradient-text {
    background: -webkit-gradient(
        linear,
        left top,
        right top,
        from(#ff0080),
        color-stop(#ff8c00),
        to(#ffd700)
    );
    background: -o-linear-gradient(left, #ff0080, #ff8c00, #ffd700);
    background: linear-gradient(90deg, #ff0080, #ff8c00, #ffd700);

    -webkit-text-fill-color: transparent;
}

.gradient-text {
    background: -o-linear-gradient(
        45deg,
        #ff0000,
        #ff9900,
        #ffff00,
        #00ff00,
        #00ffff,
        #0000ff,
        #ff00ff
    );
    background: linear-gradient(
        45deg,
        #ff0000,
        #ff9900,
        #ffff00,
        #00ff00,
        #00ffff,
        #0000ff,
        #ff00ff
    );
    background-size: 200% 200%;
    color: transparent;
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-animation: gradient-animation 3s ease infinite;
    animation: gradient-animation 3s ease infinite;
}

@-webkit-keyframes gradient-animation {
    0% {
        background-position: 0% 50%;
    }
    50% {
        background-position: 100% 50%;
    }
    100% {
        background-position: 0% 50%;
    }
}

@keyframes gradient-animation {
    0% {
        background-position: 0% 50%;
    }
    50% {
        background-position: 100% 50%;
    }
    100% {
        background-position: 0% 50%;
    }
}

.animated-electric {
    color: #00ffff;
    text-shadow:
        0 0 10px #00ffff,
        0 0 20px #00ffff;
    -webkit-animation: electric-animation 1.5s infinite alternate;
    animation: electric-animation 1.5s infinite alternate;
}

@-webkit-keyframes electric-animation {
    0% {
        text-shadow:
            0 0 10px #00ffff,
            0 0 20px #00ffff;
    }
    100% {
        text-shadow:
            0 0 20px #00ffff,
            0 0 40px #00ffff;
    }
}

@keyframes electric-animation {
    0% {
        text-shadow:
            0 0 10px #00ffff,
            0 0 20px #00ffff;
    }
    100% {
        text-shadow:
            0 0 20px #00ffff,
            0 0 40px #00ffff;
    }
}

.animated-mystic-rainbow {
    background: -o-linear-gradient(45deg, #ff00ff, #00ffff, #ff69b4);
    background: linear-gradient(45deg, #ff00ff, #00ffff, #ff69b4);
    -webkit-text-fill-color: transparent;
    -webkit-animation: mystic-rainbow-animation 3s ease infinite;
    animation: mystic-rainbow-animation 3s ease infinite;
    -webkit-background-clip: text;
    background-clip: text;
}

@-webkit-keyframes mystic-rainbow-animation {
    0% {
        background-position: 0% 50%;
    }
    50% {
        background-position: 100% 50%;
    }
    100% {
        background-position: 0% 50%;
    }
}

@keyframes mystic-rainbow-animation {
    0% {
        background-position: 0% 50%;
    }
    50% {
        background-position: 100% 50%;
    }
    100% {
        background-position: 0% 50%;
    }
}

.item-box {
    height: 60px;
    width: 150px;
}

@media (max-width: 600px) {
    .item-box {
        height: 45px;
        width: 112px;
    }
}
.animate-charcter {
    text-transform: uppercase;
    background-image: linear-gradient(-225deg, #09abcc 0%, #700ddb 29%, #ff1361 67%, #fff800 100%);
    background-size: auto auto;
    background-clip: border-box;
    background-size: 200% auto;
    color: #fff;
    background-clip: text;
    text-fill-color: transparent;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: textclip 3s linear infinite;
    display: inline-block;
}

@keyframes textclip {
    to {
        background-position: 200% center;
    }
}

.grad-form {
    background-color: currentColor;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    -webkit-background-clip: text;
    background-size: cover;
}

.gradient-text2 {
    animation: glitch 3s steps(5) infinite;

    text-align: center;
}

.gradient-text3 {
    opacity: 1;
    background-image: linear-gradient(
        0deg,
        rgb(148, 77, 255) 20%,
        rgb(238, 235, 255) 50%,
        rgb(0, 204, 255) 75%
    );
}

.gradient-text4 {
    opacity: 1;
    background-image: linear-gradient(90deg, rgb(247, 0, 102) 0%, rgb(162, 0, 198) 100%);
    filter: drop-shadow(rgb(255, 0, 89) 0px 0px 5px);
}

.gradient-text5 {
    opacity: 1;
    background-image: linear-gradient(270deg, rgb(2, 201, 248) 0%, rgb(28, 100, 242) 100%);
    filter: drop-shadow(rgb(0, 90, 194) 0px 0px 0.1px);
}

.gradient-text6 {
    opacity: 1;
    background-image: linear-gradient(
        90deg,
        rgb(156, 102, 255) 25%,
        rgb(148, 230, 255) 50%,
        rgb(244, 128, 255) 75%
    );
}

.gradient-text7 {
    opacity: 1;
    background-image: linear-gradient(
        156deg,
        rgb(199, 144, 254) 0%,
        rgb(82, 226, 255) 15%,
        rgb(10, 255, 161) 30%,
        rgb(255, 77, 222) 90%
    );
}

.gradient-text8 {
    opacity: 1;
    background-image: linear-gradient(
        90deg,
        rgb(247, 89, 93) 0%,
        rgb(254, 199, 88) 50%,
        rgb(188, 245, 0) 100%
    );
}

.gradient-text9 {
    opacity: 1;
    background-image: repeating-radial-gradient(
        rgb(188, 241, 236) 7%,
        rgb(51, 198, 247) 24%,
        rgb(215, 243, 253) 52%
    );
    filter: drop-shadow(rgb(39, 129, 237) 0px 0px 0.1px);
}

.gradient-text10 {
    opacity: 1;
    background-image: linear-gradient(
        90deg,
        rgb(255, 247, 0) 0%,
        rgb(255, 196, 0) 20%,
        rgb(255, 132, 56) 40%,
        rgb(255, 31, 119) 60%,
        rgb(255, 0, 187) 80%,
        rgb(238, 0, 255) 100%
    );
    filter: drop-shadow(rgb(238, 0, 255) 0px 0px 0.1px);
}

.gradient-text11 {
    opacity: 1;
    background-image: radial-gradient(
        circle,
        rgb(254, 80, 79) 0%,
        rgb(254, 80, 79) 35%,
        rgb(255, 97, 96) 20%,
        rgb(255, 97, 96) 55%,
        rgb(251, 233, 233) 55%,
        rgb(251, 233, 233) 70%,
        rgb(195, 238, 123) 70%,
        rgb(195, 238, 123) 85%,
        rgb(162, 230, 81) 85%,
        rgb(162, 230, 81) 100%
    );
}

.gradient-text12 {
    opacity: 1;
    background-image: linear-gradient(
        rgb(255, 209, 236) 20%,
        rgb(228, 94, 94) 54%,
        rgb(212, 2, 44) 76%,
        rgb(138, 0, 55) 100%
    );
    filter: drop-shadow(rgb(174, 15, 15) 0px 0px 0.1px) drop-shadow(rgb(174, 15, 15) 0px 0px 4px);
}

.gradient-text13 {
    opacity: 1;
    background-image: linear-gradient(
        225deg,
        rgb(41, 41, 41) 0%,
        rgb(107, 107, 107) 25%,
        rgb(204, 204, 204) 50%,
        rgb(255, 194, 26) 50%,
        rgb(254, 103, 22) 60%,
        rgb(254, 22, 22) 80%,
        rgb(153, 0, 0) 95%
    );
    filter: drop-shadow(rgb(107, 107, 107) 0px 0px 0.1px)
        drop-shadow(rgb(107, 107, 107) 0px 0px 4px);
}

.gradient-text14 {
    opacity: 1;
    background-image: radial-gradient(
        circle,
        rgb(255, 247, 0) 15%,
        rgb(255, 149, 0) 30%,
        rgb(219, 29, 15) 100%
    );
    filter: drop-shadow(rgb(224, 15, 0) 0px 0px 4px);
}

.gradient-text15 {
    opacity: 1;
    background-image: linear-gradient(
        90deg,
        rgb(249, 255, 30) 19%,
        rgb(0, 255, 179) 49%,
        rgb(0, 110, 255) 100%
    );
    filter: drop-shadow(rgb(0, 110, 255) 0px 0px 0.1px);
}

@keyframes glitch {
    0% {
        text-shadow:
            1px 0 0 red,
            -1px 0 0 #0c33f5;
        filter: blur(0);
    }
    1% {
        text-shadow:
            1px 0 0 red,
            -1px 0 0 #0c33f5;
        filter: blur(0);
    }
    2% {
        text-shadow:
            1px 0 0 red,
            -1px 0 0 #0c33f5;
        filter: blur(0);
    }
    3% {
        text-shadow:
            1px 0 0 red,
            -1px 0 0 #0c33f5;
        filter: blur(0);
    }
    4% {
        text-shadow:
            1px 0 0 red,
            -1px 0 0 #0c33f5;
        filter: blur(0);
    }
    5% {
        text-shadow:
            -1px 0 0 red,
            1px 0 0 #0c33f5;
        filter: blur(0);
    }
    6% {
        text-shadow:
            -1px 0 0 red,
            1px 0 0 #0c33f5;
        filter: blur(0);
    }
    7% {
        text-shadow:
            -1px 0 0 red,
            1px 0 0 #0c33f5;
        filter: blur(0);
    }
    8% {
        text-shadow:
            -1px 0 0 red,
            1px 0 0 #0c33f5;
        filter: blur(0);
    }
    9% {
        text-shadow:
            -1px 0 0 red,
            1px 0 0 #0c33f5;
        filter: blur(0);
    }
    10% {
        text-shadow:
            -1px 0 0 red,
            1px 0 0 #0c33f5;
        filter: blur(0);
    }
    11% {
        text-shadow:
            0.5px 0 0 red,
            -0.5px 0 0 lime;
        filter: blur(0.5px);
    }
    12% {
        text-shadow:
            0.5px 0 0 red,
            -0.5px 0 0 lime;
        filter: blur(0.5px);
    }
    13% {
        text-shadow:
            0.5px 0 0 red,
            -0.5px 0 0 lime;
        filter: blur(0.5px);
    }
    14% {
        text-shadow:
            0.5px 0 0 red,
            -0.5px 0 0 lime;
        filter: blur(0);
    }
    15% {
        text-shadow:
            0.5px 0 0 red,
            -0.5px 0 0 lime;
        filter: blur(0);
    }
    16% {
        text-shadow:
            -1px 0 0 red,
            1px 0 0 lime;
        filter: blur(0);
    }
    17% {
        text-shadow:
            -1px 0 0 red,
            1px 0 0 lime;
        filter: blur(0);
    }
    18% {
        text-shadow:
            -1px 0 0 red,
            1px 0 0 lime;
        filter: blur(0);
    }
    19% {
        text-shadow:
            -1px 0 0 red,
            1px 0 0 lime;
        filter: blur(0);
    }
    20% {
        text-shadow:
            -1px 0 0 red,
            1px 0 0 lime;
        filter: blur(0);
    }
    21% {
        text-shadow:
            0.4px 0 0 #0c33f5,
            -0.4px 0 0 lime;
        filter: blur(0);
    }
    22% {
        text-shadow:
            0.4px 0 0 #0c33f5,
            -0.4px 0 0 lime;
        filter: blur(0);
    }
    23% {
        text-shadow:
            0.4px 0 0 #0c33f5,
            -0.4px 0 0 lime;
        filter: blur(0);
    }
    24% {
        text-shadow:
            0.4px 0 0 #0c33f5,
            -0.4px 0 0 lime;
        filter: blur(0);
    }
    25% {
        text-shadow:
            0.4px 0 0 #0c33f5,
            -0.4px 0 0 lime;
        filter: blur(0);
    }
    26% {
        text-shadow:
            0.4px 0 0 #0c33f5,
            -0.4px 0 0 lime;
        filter: blur(0.5px);
    }
    27% {
        text-shadow:
            0.4px 0 0 #0c33f5,
            -0.4px 0 0 lime;
        filter: blur(0.5px);
    }
    28% {
        text-shadow:
            0.4px 0 0 #0c33f5,
            -0.4px 0 0 lime;
        filter: blur(0);
    }
    29% {
        text-shadow:
            0.4px 0 0 #0c33f5,
            -0.4px 0 0 lime;
        filter: blur(0);
    }
    30% {
        text-shadow:
            0.4px 0 0 #0c33f5,
            -0.4px 0 0 lime;
        filter: blur(0);
    }
    31% {
        text-shadow:
            -1px 0 0 #0c33f5,
            1px 0 0 lime;
        filter: blur(0);
    }
    32% {
        text-shadow:
            -1px 0 0 #0c33f5,
            1px 0 0 lime;
        filter: blur(0);
    }
    33% {
        text-shadow:
            -1px 0 0 #0c33f5,
            1px 0 0 lime;
        filter: blur(0);
    }
    34% {
        text-shadow:
            -1px 0 0 #0c33f5,
            1px 0 0 lime;
        filter: blur(0);
    }
    35% {
        text-shadow:
            -1px 0 0 #0c33f5,
            1px 0 0 lime;
        filter: blur(0.5px);
    }
    36% {
        text-shadow:
            -1px 0 0 #0c33f5,
            1px 0 0 lime;
        filter: blur(0.5px);
    }
    37% {
        text-shadow:
            -1px 0 0 #0c33f5,
            1px 0 0 lime;
        filter: blur(0.5px);
    }
    38% {
        text-shadow:
            -1px 0 0 #0c33f5,
            1px 0 0 lime;
        filter: blur(0);
    }
    39% {
        text-shadow:
            -1px 0 0 #0c33f5,
            1px 0 0 lime;
        filter: blur(0);
    }
    40% {
        text-shadow:
            -1px 0 0 #0c33f5,
            1px 0 0 lime;
        filter: blur(0);
    }
    41% {
        text-shadow:
            15px 0 0 #0c33f5,
            -15px 0 0 lime;
        filter: blur(0);
    }
    42% {
        text-shadow:
            0 0 0 #0c33f5,
            0 0 0 lime;
        filter: blur(0);
    }
    43% {
        text-shadow:
            0.5px 0 0 red,
            -0.5px 0 0 lime;
        filter: blur(0);
    }
    44% {
        text-shadow:
            0.5px 0 0 red,
            -0.5px 0 0 lime;
        filter: blur(0);
    }
    45% {
        text-shadow:
            0.5px 0 0 red,
            -0.5px 0 0 lime;
        filter: blur(0);
    }
    46% {
        text-shadow:
            0.5px 0 0 red,
            -0.5px 0 0 lime;
        filter: blur(0.5px);
    }
    47% {
        text-shadow:
            -1px 0 0 red,
            1px 0 0 lime;
        filter: blur(0.5px);
    }
    48% {
        text-shadow:
            -1px 0 0 red,
            1px 0 0 lime;
        filter: blur(0);
    }
    49% {
        text-shadow:
            -1px 0 0 red,
            1px 0 0 lime;
        filter: blur(0);
    }
    50% {
        text-shadow:
            -1px 0 0 red,
            1px 0 0 lime;
        filter: blur(0);
    }
    51% {
        text-shadow:
            1px 0 0 red,
            -1px 0 0 #0c33f5;
        filter: blur(0);
    }
    52% {
        text-shadow:
            1px 0 0 red,
            -1px 0 0 #0c33f5;
        filter: blur(0);
    }
    53% {
        text-shadow:
            1px 0 0 red,
            -1px 0 0 #0c33f5;
        filter: blur(0);
    }
    54% {
        text-shadow:
            1px 0 0 red,
            -1px 0 0 #0c33f5;
        filter: blur(0);
    }
    55% {
        text-shadow:
            1px 0 0 red,
            -1px 0 0 #0c33f5;
        filter: blur(0.5px);
    }
    56% {
        text-shadow:
            -1px 0 0 red,
            1px 0 0 #0c33f5;
        filter: blur(0.5px);
    }
    57% {
        text-shadow:
            -1px 0 0 red,
            1px 0 0 #0c33f5;
        filter: blur(0.5px);
    }
    58% {
        text-shadow:
            -1px 0 0 red,
            1px 0 0 #0c33f5;
        filter: blur(0);
    }
    59% {
        text-shadow:
            -1px 0 0 red,
            1px 0 0 #0c33f5;
        filter: blur(0);
    }
    60% {
        text-shadow:
            -1px 0 0 red,
            1px 0 0 #0c33f5;
        filter: blur(0);
    }
    61% {
        text-shadow:
            30px 0 0 red,
            -30px 0 0 lime;
        filter: blur(0);
    }
    62% {
        text-shadow:
            0 0 0 red,
            0 0 0 lime;
        filter: blur(0);
    }
    63% {
        text-shadow:
            0.5px 0 0 red,
            -0.5px 0 0 #0c33f5;
        filter: blur(0);
    }
    64% {
        text-shadow:
            0.5px 0 0 red,
            -0.5px 0 0 #0c33f5;
        filter: blur(0);
    }
    65% {
        text-shadow:
            0.5px 0 0 red,
            -0.5px 0 0 #0c33f5;
        filter: blur(0);
    }
    66% {
        text-shadow:
            0.5px 0 0 red,
            -0.5px 0 0 #0c33f5;
        filter: blur(0.5px);
    }
    67% {
        text-shadow:
            -1px 0 0 red,
            1px 0 0 #0c33f5;
        filter: blur(0.5px);
    }
    68% {
        text-shadow:
            -1px 0 0 red,
            1px 0 0 #0c33f5;
        filter: blur(0);
    }
    69% {
        text-shadow:
            -1px 0 0 red,
            1px 0 0 #0c33f5;
        filter: blur(0);
    }
    70% {
        text-shadow:
            -1px 0 0 red,
            1px 0 0 #0c33f5;
        filter: blur(0);
    }
    71% {
        text-shadow:
            50px 0 0 red,
            -50px 0 0 #0c33f5;
        filter: blur(0);
    }
    72% {
        text-shadow:
            0 0 0 red,
            0 0 0 #0c33f5;
        filter: blur(0);
    }
    73% {
        text-shadow:
            1px 0 0 red,
            -1px 0 0 #0c33f5;
        filter: blur(0);
    }
    74% {
        text-shadow:
            1px 0 0 red,
            -1px 0 0 #0c33f5;
        filter: blur(0);
    }
    75% {
        text-shadow:
            1px 0 0 red,
            -1px 0 0 #0c33f5;
        filter: blur(0);
    }
    76% {
        text-shadow:
            1px 0 0 red,
            -1px 0 0 #0c33f5;
        filter: blur(0);
    }
    77% {
        text-shadow:
            -1px 0 0 red,
            1px 0 0 #0c33f5;
        filter: blur(0);
    }
    78% {
        text-shadow:
            -1px 0 0 red,
            1px 0 0 #0c33f5;
        filter: blur(0);
    }
    79% {
        text-shadow:
            -1px 0 0 red,
            1px 0 0 #0c33f5;
        filter: blur(0);
    }
    80% {
        text-shadow:
            -1px 0 0 red,
            1px 0 0 #0c33f5;
        filter: blur(0);
    }
    81% {
        text-shadow:
            0.5px 0 0 red,
            -0.5px 0 0 lime;
        filter: blur(0);
    }
    82% {
        text-shadow:
            0.5px 0 0 red,
            -0.5px 0 0 lime;
        filter: blur(0);
    }
    83% {
        text-shadow:
            0.5px 0 0 red,
            -0.5px 0 0 lime;
        filter: blur(0.5px);
    }
    84% {
        text-shadow:
            0.5px 0 0 red,
            -0.5px 0 0 lime;
        filter: blur(0.5px);
    }
    85% {
        text-shadow:
            0.5px 0 0 red,
            -0.5px 0 0 lime;
        filter: blur(0.5px);
    }
    86% {
        text-shadow:
            -0.5px 0 0 red,
            0.5px 0 0 lime;
        filter: blur(0.5px);
    }
    87% {
        text-shadow:
            -0.5px 0 0 red,
            0.5px 0 0 lime;
        filter: blur(0.5px);
    }
    88% {
        text-shadow:
            -0.5px 0 0 red,
            0.5px 0 0 lime;
        filter: blur(0);
    }
    89% {
        text-shadow:
            -0.5px 0 0 red,
            0.5px 0 0 lime;
        filter: blur(0);
    }
    90% {
        text-shadow:
            -0.5px 0 0 red,
            0.5px 0 0 lime;
        filter: blur(0);
    }
    91% {
        text-shadow:
            15px 0 0 lime,
            -15px 0 0 #0c33f5;
        filter: blur(0);
    }
    92% {
        text-shadow:
            0 0 0 lime,
            0 0 0 #0c33f5;
        filter: blur(0);
    }
    93% {
        text-shadow:
            0.4px 0 0 #0c33f5,
            -0.4px 0 0 lime;
        filter: blur(0);
    }
    94% {
        text-shadow:
            0.4px 0 0 #0c33f5,
            -0.4px 0 0 lime;
        filter: blur(0);
    }
    95% {
        text-shadow:
            0.4px 0 0 #0c33f5,
            -0.4px 0 0 lime;
        filter: blur(0);
    }
    96% {
        text-shadow:
            -0.5px 0 0 #0c33f5,
            0.5px 0 0 lime;
        filter: blur(0);
    }
    97% {
        text-shadow:
            -0.5px 0 0 #0c33f5,
            0.5px 0 0 lime;
        filter: blur(0);
    }
    98% {
        text-shadow:
            -0.5px 0 0 #0c33f5,
            0.5px 0 0 lime;
        filter: blur(0);
    }
    99% {
        text-shadow:
            -0.5px 0 0 #0c33f5,
            0.5px 0 0 lime;
        filter: blur(0);
    }
    100% {
        text-shadow:
            -0.5px 0 0 #0c33f5,
            0.5px 0 0 lime;
        filter: blur(0);
    }
}
</style>
