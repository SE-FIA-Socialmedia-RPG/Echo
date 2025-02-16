<script setup lang="ts">
import {ref} from 'vue'
import NavigationBar from '@/components/NavigationBar.vue'

const appName = ref<string>('Social Media RPG')
</script>

<template>
    <div id="app">
        <NavigationBar />

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
        text-shadow: 0 0 5px #ffcc00, 0 0 10px #ffcc00;
    }
    50% {
        text-shadow: 0 0 20px #ffcc00, 0 0 30px #ffcc00;
    }
}

@keyframes sparkle-animation {
    0%,
    100% {
        text-shadow: 0 0 5px #ffcc00, 0 0 10px #ffcc00;
    }
    50% {
        text-shadow: 0 0 20px #ffcc00, 0 0 30px #ffcc00;
    }
}

/* Glühender Name */
.animated-glow {
    color: #00ffcc;
    text-shadow: 0 0 5px #00ffcc, 0 0 10px #00ffcc, 0 0 15px #00ffcc;
    -webkit-animation: glow-animation 1.5s infinite alternate;
    animation: glow-animation 1.5s infinite alternate;
}

@-webkit-keyframes glow-animation {
    0% {
        text-shadow: 0 0 5px #00ffcc, 0 0 10px #00ffcc, 0 0 15px #00ffcc;
    }
    100% {
        text-shadow: 0 0 20px #00ffcc, 0 0 30px #00ffcc, 0 0 40px #00ffcc;
    }
}

@keyframes glow-animation {
    0% {
        text-shadow: 0 0 5px #00ffcc, 0 0 10px #00ffcc, 0 0 15px #00ffcc;
    }
    100% {
        text-shadow: 0 0 20px #00ffcc, 0 0 30px #00ffcc, 0 0 40px #00ffcc;
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
    text-shadow: 0 0 5px #ffffff, 0 0 10px #ffffff, 0 0 15px #ff00ff, 0 0 20px #ff00ff;
}

/* Schattierter Name */
.text-shadow {
    color: #4a5568;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
}

/* Neon Name */
.neon {
    color: #00ffcc;
    text-shadow: 0 0 5px #00ffcc, 0 0 10px #00ffcc, 0 0 15px #00ffcc;
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
    text-shadow: 0 0 10px #00ffff, 0 0 20px #00ffff;
    -webkit-animation: electric-animation 1.5s infinite alternate;
    animation: electric-animation 1.5s infinite alternate;
}

@-webkit-keyframes electric-animation {
    0% {
        text-shadow: 0 0 10px #00ffff, 0 0 20px #00ffff;
    }
    100% {
        text-shadow: 0 0 20px #00ffff, 0 0 40px #00ffff;
    }
}

@keyframes electric-animation {
    0% {
        text-shadow: 0 0 10px #00ffff, 0 0 20px #00ffff;
    }
    100% {
        text-shadow: 0 0 20px #00ffff, 0 0 40px #00ffff;
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
</style>
