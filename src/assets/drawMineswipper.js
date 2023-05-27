
document.body.innerHTML = `
<div class="container">
<div class="minesweeper">
    <header class="header">
        <ul class="header-list">
            <li class="header-list_li game-settings">Новая игра</li>
            <li class="header-list_li game-rules">Как играть?</li>
            <li class="header-list_li game-results">Результаты</li>
        </ul>
    </header>
    <main class="main">
        <section class="flags">
            <div class="flag-mines">00</div>
            <button class="flag-smile">😵</button>
            <div class="flag-time">000</div>
        </section>
        <section class="play-field">
            <div class="canvas"></div>
        </section>
    </main>
    <footer class="footer">
        <ul class="footer-list">
            <li class="footer-list_li">
            <button class="theme">Тема</button>
            </li>
            <li class="footer-list_li amount">Осталось мин: 10/10</li>
            <li class="footer-list_li">
            <button class="sound">Звук
            <div class='not-sound'></div
            </button>
            </li>
        </ul>
    </footer>
</div>
</div>
`;

