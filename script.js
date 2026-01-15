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

            //タイピングアニメーション
            const text = "もう、トルソー撮影で満足しなくていい！";
            const target = document.getElementById('typing-text');
            let index = 0;

            function type() {
                if (index < text.length) {
                    // 1文字追加
                    target.textContent += text.charAt(index);
                    index++;
                    // 150ミリ秒ごと（0.15秒）に繰り返す
                    setTimeout(type, 150);
                }
            }

            // 画面が読み込まれたらスタート
            window.onload = type;
        });