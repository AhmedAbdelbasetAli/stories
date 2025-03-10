const stories = [
    {
        title: "The Letters of Love",
        fullText: `[Full story text as before]`,
        pages: [] // Will be populated dynamically
    },
    {
        title: "The Letters of Love",
        fullText: `In a small town, two high school students, Clara and James, were inseparable friends. They shared everything—dreams, fears, and secrets. As they grew older, their friendship blossomed into something deeper, but neither had the courage to confess their feelings.

One summer, Clara's family moved away, and they promised to stay in touch. They began writing letters to each other, pouring their hearts out on paper. Each letter was filled with longing and affection, but they never crossed the line into romance.

Years passed, and Clara returned to town for a visit. She found James at their favorite café, and the chemistry was undeniable. They spent the day reminiscing, and as the sun set, Clara revealed her feelings. James smiled, pulling out a letter he had written but never sent. It was a confession of love. They embraced, realizing that their hearts had always known what their words had yet to say. From that day on, they were not just friends but partners, ready to write the next chapter of their lives together.`,
        pages: []
    },
    {
        title: "The Unexpected Journey",
        fullText: `Sophie was a travel blogger who had visited countless countries, but she had never found love. On a trip to Italy, she met Marco, a local artist who was passionate about his work. They met by chance at a bustling market, where Marco was selling his paintings. Intrigued by his talent, Sophie struck up a conversation, and they quickly discovered a shared love for adventure.

Marco offered to show Sophie around the hidden gems of the city. They spent days exploring cobblestone streets, sharing gelato, and laughing over dinner. As they wandered through art galleries and picturesque landscapes, their bond deepened. Sophie found herself falling for Marco, but she was hesitant to start a relationship that might end when her trip was over.

On her last night in Italy, Marco took Sophie to a beautiful viewpoint overlooking the city. Under the stars, he confessed his feelings, and Sophie realized she felt the same. They shared a passionate kiss, knowing that their love story was just beginning. They decided to make it work, promising to visit each other and explore the world together, proving that love knows no boundaries.`,
        pages: []
    },
    {
        title: "The Second Chance",
        fullText: `After a painful divorce, Sarah moved to a new city to start fresh. She was determined to focus on her career and heal her heart. One day, while volunteering at a local shelter, she met David, a kind-hearted man who had also experienced loss. They bonded over their shared experiences and quickly became friends.

As they spent more time together, Sarah found herself drawn to David's warmth and humor. He made her laugh and feel alive again. However, she was scared to open her heart after her past. David, sensing her hesitation, was patient and supportive, never pushing her to move faster than she was comfortable.

One evening, while watching the sunset at a park, Sarah finally let her guard down. She shared her fears and insecurities, and David listened intently. He took her hand and told her that love is worth the risk, that it can heal even the deepest wounds. In that moment, Sarah realized she was ready to embrace love again. They shared a tender kiss, marking the beginning of a beautiful relationship built on trust, understanding, and second chances.`,
        pages: []
    },
    {
        title: "The Dance of Fate",
        fullText: `In a bustling city, Mia was a talented ballet dancer preparing for her biggest performance yet. She was dedicated to her craft, often sacrificing her personal life for her passion. One day, while rehearsing at the studio, she met Alex, a charming musician who was composing a score for the ballet. Their paths crossed frequently, and they quickly developed a friendship.

As they collaborated, Mia found herself captivated by Alex's creativity and passion for music. He inspired her to push her boundaries and explore new styles of dance. They spent long hours together, sharing dreams and aspirations, and their friendship blossomed into a deep connection.

On the night of the performance, Mia was nervous but excited. As she danced, she felt Alex's music flowing through her, guiding her movements. After the show, Alex surprised her with a bouquet of flowers and confessed his feelings. Mia, overwhelmed with joy, admitted she felt the same. They shared a passionate kiss, realizing that their love was the perfect harmony of dance and music, destined to create beautiful moments together.`,
        pages: []
    },
    {
        title: "The Garden of Memories",
        fullText: `In a picturesque village, an elderly woman named Eleanor tended to her garden, a place filled with vibrant flowers and memories of her late husband, Henry. They had shared a beautiful life together, filled with love and laughter. After Henry's passing, Eleanor found solace in her garden, where she felt his presence in every bloom.

One day, a young man named Liam moved into the house next door. He was a landscape architect, passionate about creating beautiful outdoor spaces. Eleanor was initially hesitant to engage with him, fearing the pain of loss. However, Liam's kindness and enthusiasm for gardening slowly broke down her walls.

As they worked together to revitalize Eleanor's garden, they shared stories of their lives. Liam listened intently as Eleanor recounted her memories with Henry, and she found comfort in sharing her past. In return, Liam opened up about his dreams and aspirations, and Eleanor felt a spark of joy she hadn't experienced in years.

Over time, their friendship blossomed into a deep bond. Liam helped Eleanor see that love can take many forms and that it's never too late to find companionship. One evening, as they admired the garden they had nurtured together, Eleanor realized that her heart was ready to embrace love again. They shared a gentle kiss, surrounded by the beauty of the flowers, symbolizing new beginnings and the enduring power of love.`,
        pages: []
    }
];

let currentStoryIndex = 0;
let currentPage = 1;
let totalPages = 1;

const storyTitle = document.getElementById('story-title');
const storyTextPreview = document.getElementById('story-text-preview');
const storyTextFull = document.getElementById('story-text-full');
const readMoreBtn = document.getElementById('read-more-btn');
const currentPageEl = document.getElementById('current-page');
const totalPagesEl = document.getElementById('total-pages');
const storyCard = document.getElementById('story-card');

function splitStoryIntoPages(text, charsPerPage = 500) {
    const pages = [];
    let remainingText = text;

    while (remainingText.length > 0) {
        // Try to split at a sentence boundary
        let pageText = remainingText.substring(0, charsPerPage);
        const lastSpaceIndex = pageText.lastIndexOf(' ');
        
        if (lastSpaceIndex !== -1) {
            pageText = pageText.substring(0, lastSpaceIndex);
        }

        pages.push(pageText.trim());
        remainingText = remainingText.substring(pageText.length).trim();
    }

    return pages;
}

function displayStory(index) {
    // Reset page state
    currentPage = 1;

    // Prepare story
    const story = stories[index];
    
    // Split story into pages if not already done
    if (!story.pages || story.pages.length === 0) {
        story.pages = splitStoryIntoPages(story.fullText);
    }

    // Update total pages
    totalPages = story.pages.length;
    totalPagesEl.textContent = totalPages;

    // Display first page
    storyTitle.textContent = story.title;
    storyTextPreview.textContent = story.pages[0];
    
    // Reset full text
    storyTextFull.innerHTML = '';
    storyTextFull.classList.remove('expanded');
    readMoreBtn.textContent = 'Read More';

    // Update page indicator
    currentPageEl.textContent = currentPage;

    // Animation
    storyCard.classList.remove('animate__fadeInRight', 'animate__fadeInLeft');
    void storyCard.offsetWidth; // Trigger reflow
    storyCard.classList.add(index > currentStoryIndex ? 'animate__fadeInRight' : 'animate__fadeInLeft');
}

// Read More functionality
readMoreBtn.addEventListener('click', () => {
    const story = stories[currentStoryIndex];
    
    if (!storyTextFull.classList.contains('expanded')) {
        // Expand full text
        storyTextFull.innerHTML = story.fullText;
        storyTextFull.classList.add('expanded');
        readMoreBtn.textContent = 'Collapse';
    } else {
        // Collapse
        storyTextFull.innerHTML = '';
        storyTextFull.classList.remove('expanded');
        readMoreBtn.textContent = 'Read More';
    }
});

// Navigation buttons
document.getElementById('next-story').addEventListener('click', () => {
    currentStoryIndex = (currentStoryIndex + 1) % stories.length;
    displayStory(currentStoryIndex);
});

document.getElementById('prev-story').addEventListener('click', () => {
    currentStoryIndex = (currentStoryIndex - 1 + stories.length) % stories.length;
    displayStory(currentStoryIndex);
});

// Pagination (if needed)
function nextPage() {
    const story = stories[currentStoryIndex];
    if (currentPage < totalPages) {
        currentPage++;
        storyTextPreview.textContent = story.pages[currentPage - 1];
        currentPageEl.textContent = currentPage;
    }
}

function prevPage() {
    const story = stories[currentStoryIndex];
    if (currentPage > 1) {
        currentPage--;
        storyTextPreview.textContent = story.pages[currentPage - 1];
        currentPageEl.textContent = currentPage;
    }
}

// Initial story display
displayStory(currentStoryIndex);

// Falling Petals Animation (keep existing code)
function createPetal() {
    const petal = document.createElement('div');
    petal.classList.add('petal');
    
    petal.style.left = `${Math.random() * 100}%`;
    petal.style.animationDuration = `${5 + Math.random() * 5}s`;
    petal.style.opacity = Math.random();
    
    document.querySelector('.falling-petals').appendChild(petal);
    
    setTimeout(() => {
        petal.remove();
    }, 10000);
}

// Create petals periodically
setInterval(createPetal, 300);
