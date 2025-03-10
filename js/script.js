let currentStoryIndex = 0;

// DOM Elements
const storyTitle = document.getElementById('story-title');
const storyPreview = document.getElementById('story-preview');
const storyFull = document.getElementById('story-full');
const storyImage = document.getElementById('story-image');
const readMoreBtn = document.getElementById('read-more-btn');
const currentStoryEl = document.getElementById('current-story');
const totalStoriesEl = document.getElementById('total-stories');

// Display Story
function displayStory(index) {
    const story = stories[index];
    
    storyTitle.textContent = story.title;
    storyPreview.textContent = story.fullText.substring(0, 300) + '...';
    
    // Generate storybook image with page number
    storyImage.src = generateStoryBookImage(story.pageNumber);
    
    // Reset full story
    storyFull.innerHTML = '';
    readMoreBtn.textContent = 'Read More';
    
    // Update story progress
    currentStoryEl.textContent = index + 1;
    totalStoriesEl.textContent = stories.length;
}

// Generate Storybook Image
function generateStoryBookImage(pageNumber) {
    // Create a canvas to generate the storybook image
    const canvas = document.createElement('canvas');
    canvas.width = 400;
    canvas.height = 400;
    const ctx = canvas.getContext('2d');

    // Background
    ctx.fillStyle = '#F8E5E5';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Book outline
    ctx.strokeStyle = '#8B4513';
    ctx.lineWidth = 10;
    ctx.strokeRect(50, 50, canvas.width - 100, canvas.height - 100);

    // Page number
    ctx.font = 'bold 120px Arial';
    ctx.fillStyle = '#8B4513';
    ctx.textAlign = 'center';
    ctx.fillText(pageNumber, canvas.width / 2, canvas.height / 2 + 40);

    // Book binding
    ctx.beginPath();
    ctx.moveTo(canvas.width / 2, 50);
    ctx.lineTo(canvas.width / 2, canvas.height - 50);
    ctx.strokeStyle = '#5D3A1A';
    ctx.lineWidth = 5;
    ctx.stroke();

    // Return the canvas as a data URL
    return canvas.toDataURL();
}

// Read More Functionality
readMoreBtn.addEventListener('click', () => {
    const story = stories[currentStoryIndex];
    
    if (readMoreBtn.textContent === 'Read More') {
        storyFull.textContent = story.fullText;
        readMoreBtn.textContent = 'Collapse';
    } else {
        storyFull.innerHTML = '';
        readMoreBtn.textContent = 'Read More';
    }
});

// Navigation
document.getElementById('next-story').addEventListener('click', () => {
    currentStoryIndex = (currentStoryIndex + 1) % stories.length;
    displayStory(currentStoryIndex);
});

document.getElementById('prev-story').addEventListener('click', () => {
    currentStoryIndex = (currentStoryIndex - 1 + stories.length) % stories.length;
    displayStory(currentStoryIndex);
});

// Initialize
displayStory(currentStoryIndex);
