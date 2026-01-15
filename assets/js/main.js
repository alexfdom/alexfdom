document.addEventListener('DOMContentLoaded', function() {
    function generateDynamicTOC() {
        const mainContent = document.getElementById('main-content');
        const tocContainer = document.getElementById('dynamic-toc');
        
        if (!mainContent || !tocContainer) return;
        
        const headings = mainContent.querySelectorAll('h2, h3');
        if (headings.length === 0) {
            tocContainer.innerHTML = '<p class="no-sections">No sections on this page.</p>';
            return;
        }
        
        let html = '<ul class="index-list">';
        let currentH2 = null;
        
        headings.forEach((heading, index) => {
            let id = heading.id;
            if (!id) {
                id = 'section-' + index;
                heading.id = id;
            }
            
            if (heading.tagName === 'H2') {
                if (currentH2) {
                    html += '</ul></li>';
                }
                
                html += `
                    <li class="h2-item">
                        <a href="#${id}" class="h2-link" data-target="${id}">
                            ${heading.textContent}
                        </a>
                        <ul class="h3-list">
                `;
                currentH2 = id;
                
            } else if (heading.tagName === 'H3' && currentH2) {
                html += `
                    <li class="h3-item">
                        <a href="#${id}" class="h3-link" data-target="${id}">
                            ${heading.textContent}
                        </a>
                    </li>
                `;
            }
        });
        
        if (currentH2) {
            html += '</ul></li>';
        }
        
        html += '</ul>';
        tocContainer.innerHTML = html;
        
        setupTOCInteractions();
    }
    
    function setupTOCInteractions() {
        document.querySelectorAll('#dynamic-toc a').forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 100,
                        behavior: 'smooth'
                    });
                }
            });
        });
        
        addScrollSpy();
    }
    
    function addScrollSpy() {
        const links = document.querySelectorAll('#dynamic-toc a');
        const sections = [];
        
        links.forEach(link => {
            const targetId = link.getAttribute('data-target');
            const section = document.getElementById(targetId);
            if (section) {
                sections.push({
                    link: link,
                    section: section,
                    isH3: link.classList.contains('h3-link')
                });
            }
        });
        
        function updateActiveSection() {
            let currentActive = null;
            let currentActiveIsH3 = false;
            
            sections.forEach(({ link, section, isH3 }) => {
                const rect = section.getBoundingClientRect();
                const isInView = rect.top <= 200 && rect.bottom >= 100;
                
                if (isInView) {
                    currentActive = link;
                    currentActiveIsH3 = isH3;
                }
                
                link.classList.remove('active');
                link.parentElement.classList.remove('active-parent');
            });
            
            if (currentActive) {
                currentActive.classList.add('active');
                
                if (currentActiveIsH3) {
                    const h2Parent = currentActive.closest('.h2-item');
                    if (h2Parent) {
                        h2Parent.querySelector('.h2-link').classList.add('active-parent');
                    }
                }
            }
        }
        
        window.addEventListener('scroll', updateActiveSection);
        updateActiveSection();
    }
    
    generateDynamicTOC();
});


document.addEventListener('DOMContentLoaded', function() {
    const profile = document.getElementById('profile-cycle');
    if (!profile) return;
    
    const rawData = profile.getAttribute('data-portraits');
    console.log('Raw data:', rawData);
    
    try {
        const portraits = JSON.parse(rawData);
        console.log('Parsed:', portraits);
        
        const basePath = window.location.pathname.split('/').slice(0, -1).join('/') || '';
        console.log('Base path:', basePath);
        
        const fixedPortraits = portraits.map(url => {
            if (url.startsWith('/') && basePath && !url.startsWith(basePath)) {
                return basePath + url;
            }
            return url;
        });
        
        console.log('Fixed URLs:', fixedPortraits);
        
        const overlay = profile.querySelector('.profile-cycle-overlay');
        const fallback = profile.querySelector('.profile-fallback');
        
        if (!overlay || !fallback) return;
        
        overlay.style.backgroundSize = 'cover';
        overlay.style.backgroundPosition = 'center';
        
        let currentIndex = 0;
        let interval = null;
        
        fixedPortraits.forEach(url => {
            const img = new Image();
            img.src = url;
        });
        
        profile.addEventListener('mouseenter', function() {
            console.log('🟢 Hover start');
            
            fallback.style.opacity = '0';
            overlay.style.opacity = '1';
            
            currentIndex = 0;
            overlay.style.backgroundImage = `url('${fixedPortraits[currentIndex]}')`;
            console.log('Showing:', fixedPortraits[currentIndex]);
            
            interval = setInterval(() => {
                currentIndex = (currentIndex + 1) % fixedPortraits.length;
                overlay.style.backgroundImage = `url('${fixedPortraits[currentIndex]}')`;
                console.log('Cycling to:', fixedPortraits[currentIndex]);
            }, 1000);
        });
        
        profile.addEventListener('mouseleave', function() {
            console.log('🔴 Hover end');
            
            if (interval) {
                clearInterval(interval);
                interval = null;
            }
            
            fallback.style.opacity = '1';
            overlay.style.opacity = '0';
            currentIndex = 0;
        });
        
    } catch (error) {
        console.error('Error:', error);
    }
});

