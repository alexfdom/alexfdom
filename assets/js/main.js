document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded - initializing TOC and profile image cycling...');
    
    generateDynamicTOC();
    
    initializeProfileImageCycle();
    
    function generateDynamicTOC() {
        const mainContent = document.getElementById('main-content');
        const tocContainer = document.getElementById('dynamic-toc');
        
        if (!mainContent || !tocContainer) {
            console.log('TOC elements not found');
            return;
        }
        
        const headings = mainContent.querySelectorAll('h2, h3');
        
        if (headings.length === 0) {
            tocContainer.innerHTML = '<p class="no-sections">No sections on this page.</p>';
            return;
        }
        
        let html = '<ul class="index-list">';
        let currentH2 = null;
        let h3ListOpen = false;
        
        headings.forEach((heading, index) => {
            if (!heading.id) {
                heading.id = 'section-' + index;
            }
            
            if (heading.tagName === 'H2') {
                if (currentH2) {
                    if (h3ListOpen) {
                        html += '</ul>';
                        h3ListOpen = false;
                    }
                    html += '</li>';
                }
                
                html += `
                    <li class="h2-item">
                        <a href="#${heading.id}" class="h2-link" data-target="${heading.id}">
                            ${heading.textContent}
                        </a>
                        <ul class="h3-list">
                `;
                currentH2 = heading.id;
                h3ListOpen = true;
                
            } else if (heading.tagName === 'H3' && currentH2) {
                html += `
                    <li class="h3-item">
                        <a href="#${heading.id}" class="h3-link" data-target="${heading.id}">
                            ${heading.textContent}
                        </a>
                    </li>
                `;
            }
        });
        
        if (currentH2) {
            if (h3ListOpen) {
                html += '</ul>';
            }
            html += '</li>';
        }
        
        html += '</ul>';
        tocContainer.innerHTML = html;
        
        setupTOCInteractions();
    }
    
    function setupTOCInteractions() {
        const tocContainer = document.getElementById('dynamic-toc');
        const scroller = document.querySelector('.content-container');
        if (!tocContainer || !scroller) return;

        tocContainer.addEventListener('click', (e) => {
            const link = e.target.closest('a[href^="#"]');
            if (!link) return;

            e.preventDefault();

            const targetId = link.getAttribute('href').slice(1);
            const targetElement = document.getElementById(targetId);
            if (!targetElement) return;

            const headerOffset = 100;
            const targetTop = targetElement.getBoundingClientRect().top -
                            scroller.getBoundingClientRect().top +
                            scroller.scrollTop;

            scroller.scrollTo({
                top: targetTop - headerOffset,
                behavior: 'smooth',
            });

            history.replaceState(null, '', `#${targetId}`);
        });

        setupScrollSpy(scroller);
    }
    
    function setupScrollSpy(scroller) {
        const tocContainer = document.getElementById('dynamic-toc');
        if (!tocContainer || !scroller) return;

        const links = [...tocContainer.querySelectorAll('a[href^="#"]')];
        if (!links.length) return;

        const idToLink = new Map();
        const sections = [];

        links.forEach((link) => {
            const id = link.getAttribute('href').slice(1);
            const el = document.getElementById(id);
            if (!el) return;

            idToLink.set(id, link);
            sections.push(el);
        });

        function clearActive() {
            links.forEach((l) => {
                l.classList.remove('active');
                l.classList.remove('active-parent');
            });

            tocContainer.querySelectorAll('.h2-link.active-parent').forEach((l) => {
                l.classList.remove('active-parent');
            });
        }

        function setActive(id) {
            clearActive();

            const link = idToLink.get(id);
            if (!link) return;

            link.classList.add('active');

            if (link.classList.contains('h3-link')) {
                const h2Item = link.closest('.h2-item');
                const h2Link = h2Item?.querySelector('.h2-link');
                if (h2Link) h2Link.classList.add('active-parent');
            }
        }

        const observer = new IntersectionObserver(
            (entries) => {
                const visible = entries
                    .filter((e) => e.isIntersecting)
                    .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

                if (visible.length) {
                    setActive(visible[0].target.id);
                } else {
                    const scrollerRect = scroller.getBoundingClientRect();
                    let bestId = null;
                    let bestTop = -Infinity;

                    for (const sec of sections) {
                        const r = sec.getBoundingClientRect();
                        const topInScroller = r.top - scrollerRect.top;

                        if (topInScroller <= 120 && topInScroller > bestTop) {
                            bestTop = topInScroller;
                            bestId = sec.id;
                        }
                    }
                    if (bestId) setActive(bestId);
                }
            },
            {
                root: scroller,
                rootMargin: "-110px 0px -65% 0px",
                threshold: [0.05, 0.1, 0.2, 0.4, 0.6, 0.8],
            }
        );

        sections.forEach((sec) => observer.observe(sec));

        requestAnimationFrame(() => {
            const hash = location.hash?.slice(1);
            if (hash && idToLink.has(hash)) {
                setActive(hash);
            } else if (sections[0]) {
                setActive(sections[0].id);
            }
        });
    }
    
    function initializeProfileImageCycle() {
        console.log('Initializing profile image cycling...');
        
        const profile = document.getElementById('profile-cycle');
        if (!profile) {
            console.log('Profile element not found');
            return;
        }
        
        const rawData = profile.getAttribute('data-portraits');
        console.log('Raw portrait data:', rawData);
        
        try {
            const portraits = JSON.parse(rawData);
            console.log('Parsed portraits:', portraits);
            
            const overlay = profile.querySelector('.profile-cycle-overlay');
            const fallback = profile.querySelector('.profile-fallback');
            
            if (!overlay || !fallback) {
                console.error('Overlay or fallback image not found');
                return;
            }
            
            overlay.style.backgroundSize = 'cover';
            overlay.style.backgroundPosition = 'center';
            
            let currentIndex = 0;
            let interval = null;
            
            portraits.forEach(url => {
                const img = new Image();
                img.src = url;
            });
            
            profile.addEventListener('mouseenter', function() {
                console.log('🟢 Profile hover started');
                
                fallback.style.opacity = '0';
                overlay.style.opacity = '1';
                
                currentIndex = 0;
                overlay.style.backgroundImage = `url('${portraits[currentIndex]}')`;
                
                interval = setInterval(() => {
                    currentIndex = (currentIndex + 1) % portraits.length;
                    overlay.style.backgroundImage = `url('${portraits[currentIndex]}')`;
                }, 1000);
            });
            
            profile.addEventListener('mouseleave', function() {
                console.log('🔴 Profile hover ended');
                
                if (interval) {
                    clearInterval(interval);
                    interval = null;
                }
                
                fallback.style.opacity = '1';
                overlay.style.opacity = '0';
                currentIndex = 0;
            });
            
        } catch (error) {
            console.error('Error with profile image cycling:', error);
        }
    }
});