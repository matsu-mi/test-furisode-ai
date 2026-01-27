// solution-num スクロールアニメーション
function showSolutionNumsOnScroll() {
	const nums = document.querySelectorAll('.solution-num');
	nums.forEach(num => {
		const rect = num.getBoundingClientRect();
		if (rect.top < window.innerHeight - 60) {
			num.classList.add('is-visible');
		}
	});
}
window.addEventListener('scroll', showSolutionNumsOnScroll);
window.addEventListener('DOMContentLoaded', showSolutionNumsOnScroll);
"use strict";

document.addEventListener('DOMContentLoaded', function() {
	// スムーズスクロール
	document.querySelectorAll('a[href^="#"]').forEach(anchor => {
		anchor.addEventListener('click', function(e) {
			e.preventDefault();
			const target = document.querySelector(this.getAttribute('href'));
			if (target) {
				window.scrollTo({
					top: target.offsetTop - 80,
					behavior: 'smooth'
				});
			}
		});
	});

	// FAQ アコーディオン
	const faqQuestions = document.querySelectorAll('.faq-question');
	faqQuestions.forEach(q => {
		q.addEventListener('click', () => {
			const parent = q.parentElement;
			const answer = parent.querySelector('.faq-answer');
			const isActive = parent.classList.contains('active');

			// 一旦すべて閉じる
			document.querySelectorAll('.faq-item').forEach(item => {
				item.classList.remove('active');
				item.querySelector('.faq-answer').style.maxHeight = null;
			});

			// クリックされたものがアクティブでなかったら、高さを計算して開く
			if (!isActive) {
				parent.classList.add('active');
				// scrollHeightで中身の本当の高さ（px）を取得してセット
				answer.style.maxHeight = answer.scrollHeight + "px";
			}
		});
	});

	// タイピングアニメーション設定
	const typingData = [
		{ display: "もう、", kana: ["も", "う", "、"], roma: ["m", "", ""] },
		{ display: "トルソー", kana: ["と", "る", "そ", "ー"], roma: ["t", "r", "s", ""] },
		{ display: "撮影", kana: ["さ", "つ", "え", "い"], roma: ["s", "t", "", ""] },
		{ display: "で", kana: ["で"], roma: ["d"] },
		{ display: "<br class='br-sp'>", kana: ["<br class='br-sp'>"], roma: [""] },
		{ display: "満足", kana: ["ま", "ん", "ぞ", "く"], roma: ["m", "n", "z", "k"] },
		{ display: "し", kana: ["し"], roma: ["s"] },
		{ display: "な", kana: ["な"], roma: ["n"] },
		{ display: "く", kana: ["く"], roma: ["k"] },
		{ display: "て", kana: ["て"], roma: ["t"] },
		{ display: "い", kana: ["い"], roma: [""] },
		{ display: "い", kana: ["い"], roma: [""] },
		{ display: "！", kana: ["！"], roma: [""] }
	];

	const target = document.getElementById('typing-text');

	if (target) {
		let wordIndex = 0;
		let charIndex = 0;
		let currentText = "";
		let currentKanaInWord = "";

		const type = () => {
			if (wordIndex < typingData.length) {
				const word = typingData[wordIndex];
				const isLatePart = wordIndex >= 8; // 「満足」以降はスピードアップ

				// --- 1. かな入力プロセス ---
				if (charIndex < word.kana.length) {
					const consonant = word.roma[charIndex];
					const targetKana = word.kana[charIndex];

					if (consonant !== "") {
						// 子音表示（一瞬）
						target.innerHTML = `${currentText}<span style="text-decoration: underline; text-underline-offset: 5px;">${currentKanaInWord}${consonant}</span>`;

						// 子音から「かな」に化ける速さ
						setTimeout(() => {
							currentKanaInWord += targetKana;
							target.innerHTML = `${currentText}<span style="text-decoration: underline; text-underline-offset: 5px;">${currentKanaInWord}</span>`;
							charIndex++;
							setTimeout(type, isLatePart ? 40 : 70);
						}, isLatePart ? 30 : 50);
					} else {
						// 母音のみ、または記号の場合
						currentKanaInWord += targetKana;
						target.innerHTML = `${currentText}<span style="text-decoration: underline; text-underline-offset: 5px;">${currentKanaInWord}</span>`;
						charIndex++;
						setTimeout(type, isLatePart ? 40 : 80);
					}
				}
				// --- 2. 漢字・カタカナ変換プロセス ---
				else {
					// 変換にかかる時間（スペースキーを叩く一瞬の間）
					setTimeout(() => {
						currentText += word.display;
						target.innerHTML = currentText;

						wordIndex++;
						charIndex = 0;
						currentKanaInWord = "";

						// 次の単語へ行くまでの間
						setTimeout(type, isLatePart ? 60 : 120);
					}, isLatePart ? 50 : 100);
				}
			}
		};
		// タイピング開始
		type();
	}

	// ハンバーガーメニュー開閉
	const navToggle = document.querySelector('.nav-toggle');
	const navMenu = document.querySelector('.nav-menu');
	if (navToggle && navMenu) {
		navToggle.addEventListener('click', function() {
			const expanded = navToggle.getAttribute('aria-expanded') === 'true';
			navToggle.setAttribute('aria-expanded', !expanded);
			navMenu.classList.toggle('active');
		});
		// メニュークリックで自動的に閉じる（スマホ用）
		navMenu.querySelectorAll('a').forEach(link => {
			link.addEventListener('click', () => {
				navMenu.classList.remove('active');
				navToggle.setAttribute('aria-expanded', 'false');
			});
		});
	}
});