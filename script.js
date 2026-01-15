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
                    const isActive = parent.classList.contains('active');

                    // すべて閉じる
                    document.querySelectorAll('.faq-item').forEach(item => {
                        item.classList.remove('active');
                    });

                    // クリックされたものがアクティブでなかったら開く
                    if (!isActive) {
                        parent.classList.add('active');
                    }
                });
            });
        });