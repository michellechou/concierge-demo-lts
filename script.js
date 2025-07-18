// DOM Elements
const helpPanel = document.getElementById('helpPanel');
const closeHelp = document.getElementById('closeHelp');

// State management
let isHelpPanelOpen = false;

// Create floating help button
function createFloatingHelpButton() {
    const floatingButton = document.createElement('div');
    floatingButton.id = 'floatingHelpButton';
    floatingButton.className = 'floating-help-button';
    floatingButton.innerHTML = `
        <div class="floating-button-content">
            <span class="help-icon">
                <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1.44262 12.2014C1.29784 11.8243 1.31039 11.4044 1.47751 11.0343C1.64464 10.6641 1.95264 10.374 2.33378 10.2277C2.71491 10.0814 3.13795 10.0909 3.50983 10.2541C3.8817 10.4174 4.17196 10.721 4.31674 11.0982L5.95446 15.3646L6.91251 14.9968L4.18297 7.88613C4.03819 7.50896 4.05074 7.08911 4.21787 6.71896C4.38499 6.34881 4.693 6.05866 5.07413 5.91236C5.45526 5.76606 5.8783 5.77558 6.25018 5.93883C6.62206 6.10208 6.91232 6.40568 7.0571 6.78286L9.42269 12.9454L10.3807 12.5777L7.28727 4.51892C7.14248 4.14175 7.15503 3.7219 7.32216 3.35175C7.48928 2.9816 7.79729 2.69145 8.17842 2.54515C8.55956 2.39885 8.98259 2.40837 9.35447 2.57162C9.72635 2.73487 10.0166 3.03847 10.1614 3.41565L13.2549 11.4744L14.2129 11.1067L11.8473 4.94407C11.7025 4.5669 11.7151 4.14705 11.8822 3.7769C12.0493 3.40674 12.3573 3.1166 12.7385 2.9703C13.1196 2.82399 13.5426 2.83352 13.9145 2.99677C14.2864 3.16002 14.5767 3.46362 14.7214 3.8408L18.1788 12.8476L19.4653 10.4719C19.6216 10.2257 19.8522 10.0344 20.1239 9.92542C20.27 9.86355 20.4267 9.83093 20.5851 9.82944C20.7436 9.82795 20.9005 9.85763 21.0469 9.91675C21.1932 9.97587 21.3261 10.0633 21.4379 10.1739C21.5497 10.2845 21.6381 10.4162 21.698 10.5613C21.8132 10.8363 21.826 11.1436 21.7341 11.4285L19.5892 17.8105C19.2052 18.9564 18.5699 20.0052 17.7294 20.8809C16.8888 21.7567 15.864 22.4375 14.7289 22.8743L14.384 23.0067C12.3513 23.787 10.0951 23.7362 8.11179 22.8655C6.12843 21.9948 4.58039 20.3756 3.80821 18.364L1.44262 12.2014Z" fill="white"/>
                </svg>
            </span>
            <span class="help-text">Recommendations</span>
        </div>
    `;
    
    // Add styles for the floating button
    const style = document.createElement('style');
    style.textContent = `
        .floating-help-button {
            position: fixed;
            bottom: 2rem;
            right: 2rem;
            width: 60px;
            height: 60px;
            background: #0A66C2;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            box-shadow: 0 4px 12px rgba(10, 102, 194, 0.4);
            transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
            z-index: 1000;
            overflow: hidden;
            transform-origin: right center;
                }
        
        .floating-help-button.auto-expanded {
            width: auto;
            padding: 0 20px 0 16px;
            border-radius: 30px;
            box-shadow: 0 6px 20px rgba(10, 102, 194, 0.6);
        }
        

        
        .floating-help-button:hover {
            transform: scale(1.05);
        }
        
        .floating-button-content {
            display: flex;
            align-items: center;
            color: white;
            font-weight: 500;
            justify-content: center;
            width: 100%;
            height: 100%;
        }
        
        .floating-help-button.auto-expanded .floating-button-content {
            justify-content: flex-start;
            gap: 8px;
        }
        

        
        .help-icon {
            display: flex;
            align-items: center;
            justify-content: center;
            flex-shrink: 0;
        }
        
        .help-icon svg {
            width: 24px;
            height: 24px;
            flex-shrink: 0;
                }
        
        .help-text {
            white-space: nowrap;
            opacity: 0;
            width: 0;
            overflow: hidden;
            transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
            font-size: 14px;
            font-weight: 500;
            display: none;
        }
        
        .floating-help-button.auto-expanded .help-text {
            display: inline;
            opacity: 1;
            width: auto;
        }
        
        @media (max-width: 768px) {
            .floating-help-button {
                bottom: 1rem;
                right: 1rem;
            }
        }
    `;
    document.head.appendChild(style);
    
    // Add click handler
    floatingButton.addEventListener('click', openHelpPanel);
    
    document.body.appendChild(floatingButton);
    
    // Auto-expand after 3 seconds
    setTimeout(() => {
        floatingButton.classList.add('auto-expanded');
    }, 3000);
}

// Store the natural height of the first page
let naturalHeight = null;

// Help Panel Functions
function openHelpPanel() {
    if (helpPanel) {
        helpPanel.classList.add('open');
        isHelpPanelOpen = true;
        
        // Capture the natural height after the panel is fully opened
        setTimeout(() => {
            if (naturalHeight === null) {
                const mainPage = document.getElementById('mainHelpPage');
                if (mainPage && mainPage.style.display !== 'none') {
                    naturalHeight = helpPanel.offsetHeight;
                    console.log('Captured natural height:', naturalHeight + 'px');
                    
                    // Apply the fixed height
                    helpPanel.style.height = naturalHeight + 'px';
                    helpPanel.style.overflowY = 'hidden';
                }
            }
            
            const links = document.querySelectorAll('.link-item');
            console.log('Found links after opening:', links.length);
            
            links.forEach((link, index) => {
                console.log(`Link ${index}:`, link.textContent.trim());
                
                if (link.textContent.includes('How does Sales Assistant work')) {
                    console.log('Adding direct click handler to Sales Assistant link');
                    
                    // Remove existing listeners
                    const newLink = link.cloneNode(true);
                    link.parentNode.replaceChild(newLink, link);
                    
                    newLink.addEventListener('click', function(e) {
                        e.preventDefault();
                        console.log('Direct click handler triggered!');
                        showDetailPage();
                    });
                }
            });
            
            // Add click handler to chat icon
            const chatIcon = document.querySelector('.chat-icon');
            if (chatIcon) {
                console.log('Adding click handler to chat icon');
                chatIcon.addEventListener('click', function(e) {
                    e.preventDefault();
                    console.log('Chat icon clicked!');
                    showDetailPageWithGreyMessage();
                });
            }
        }, 100);
    }
}

function closeHelpPanel() {
    if (helpPanel) {
        helpPanel.classList.remove('open');
        isHelpPanelOpen = false;
        
        // Reset to main page when closing
        setTimeout(() => {
            showMainPage();
        }, 300);
    }
}

// Close Help Panel Events
if (closeHelp) {
    closeHelp.addEventListener('click', closeHelpPanel);
}

// Close panel when clicking outside
document.addEventListener('click', (e) => {
    if (isHelpPanelOpen && 
        helpPanel && 
        !helpPanel.contains(e.target) && 
        !e.target.closest('.floating-help-button')) {
        closeHelpPanel();
    }
});

// Recommendation toggle functionality
function toggleRecommendation(id) {
    const recommendation = document.getElementById(id);
    if (!recommendation) return;
    
    const isExpanded = recommendation.classList.contains('expanded');
    
    // Close all other recommendations
    document.querySelectorAll('.recommendation-item').forEach(item => {
        if (item.id !== id) {
            item.classList.remove('expanded');
            const icon = item.querySelector('.expand-icon');
            if (icon) {
                icon.className = 'fas fa-chevron-down expand-icon';
            }
        }
    });
    
    // Toggle current recommendation
    if (isExpanded) {
        recommendation.classList.remove('expanded');
        const icon = recommendation.querySelector('.expand-icon');
        if (icon) {
            icon.className = 'fas fa-chevron-down expand-icon';
        }
    } else {
        recommendation.classList.add('expanded');
        const icon = recommendation.querySelector('.expand-icon');
        if (icon) {
            icon.className = 'fas fa-chevron-up expand-icon';
        }
    }
}

// Make toggleRecommendation function globally available
window.toggleRecommendation = toggleRecommendation;

// Add keyboard support
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && isHelpPanelOpen) {
        closeHelpPanel();
    }
});

// Add smooth scrolling to help panel
if (helpPanel) {
    helpPanel.addEventListener('scroll', (e) => {
        // Add subtle shadow effect when scrolling
        if (e.target.scrollTop > 0) {
            helpPanel.style.boxShadow = '-4px 0 20px rgba(0,0,0,0.2)';
        } else {
            helpPanel.style.boxShadow = '-4px 0 12px rgba(0,0,0,0.15)';
        }
    });
}

// Add hover effects for interactive elements
document.addEventListener('DOMContentLoaded', () => {
    // Floating help button created in window.addEventListener('load') instead

// Add a global test function for debugging
window.testDetailPage = function() {
    console.log('Testing detail page navigation...');
    showDetailPage();
};

// Add a global function to check links
window.checkLinks = function() {
    const links = document.querySelectorAll('.link-item');
    console.log('Current links found:', links.length);
    links.forEach((link, index) => {
        console.log(`Link ${index}:`, `"${link.textContent.trim()}"`);
    });
};

// AI Response Animation
function startAIResponse() {
    console.log('Starting AI response animation');
    
    // Reset the response state
    const aiThinking = document.getElementById('aiThinking');
    const assistantResponse = document.getElementById('assistantResponse');
    const responseContent = document.getElementById('responseContent');
    
    if (aiThinking && assistantResponse && responseContent) {
        // Show thinking animation, hide response
        aiThinking.style.display = 'flex';
        assistantResponse.style.display = 'none';
        responseContent.innerHTML = '';
        
        // Show thinking for 2 seconds, then start typing response
        setTimeout(() => {
            hideThinkingAndStartTyping();
        }, 2000);
    }
}

function hideThinkingAndStartTyping() {
    console.log('Hiding thinking animation and starting typing');
    
    const aiThinking = document.getElementById('aiThinking');
    const assistantResponse = document.getElementById('assistantResponse');
    const responseContent = document.getElementById('responseContent');
    
    if (aiThinking && assistantResponse && responseContent) {
        // Hide thinking, show response container
        aiThinking.style.display = 'none';
        assistantResponse.style.display = 'flex';
        
        // Start typing the response
        typeResponse();
    }
}

function typeResponse() {
    const responseContent = document.getElementById('responseContent');
    if (!responseContent) return;
    
    // Full text content to type out
    const fullText = "Sales Navigator's AI-powered Sales Assistant streamlines prospecting by delivering tailored leads, identifying connection pathways, and drafting personalized outreach messages.\n\nLead Recommendation and Feedback: Sales Assistant recommends leads based on your book of business, products, and personas. Providing feedback (e.g., \"Not a fit\" due to geography, seniority, or industry) fine-tunes future suggestions.\n\nPersonalized Messaging Assistance: Message Assist drafts custom first-touch messages using lead and account insights. Refine these drafts; Sales Assistant adapts to your edits for improved future messaging.\n\nProduct and Service Personalization: Specify your product or service and include detailed descriptions to ensure recommendations and messages address lead needs effectively.\n\nBook of Business: Create an account list (minimum five accounts) using CRM data, a CSV file, or manual input. This helps Sales Assistant target relevant accounts more efficiently.";
    
    // Final formatted HTML
    const finalHTML = `
        <p>Sales Navigator's AI-powered Sales Assistant streamlines prospecting by delivering tailored leads, identifying connection pathways, and drafting personalized outreach messages.</p>
        
        <p><strong>Lead Recommendation and Feedback:</strong> Sales Assistant recommends leads based on your book of business, products, and personas. Providing feedback (e.g., "Not a fit" due to geography, seniority, or industry) fine-tunes future suggestions.</p>
        
        <p><strong>Personalized Messaging Assistance:</strong> Message Assist drafts custom first-touch messages using lead and account insights. Refine these drafts; Sales Assistant adapts to your edits for improved future messaging.</p>
        
        <p><strong>Product and Service Personalization:</strong> Specify your product or service and include detailed descriptions to ensure recommendations and messages address lead needs effectively.</p>
        
        <p><strong>Book of Business:</strong> Create an account list (minimum five accounts) using CRM data, a CSV file, or manual input. This helps Sales Assistant target relevant accounts more efficiently.</p>
    `;
    
    let currentIndex = 0;
    const typingSpeed = 25; // milliseconds per character
    
    // Start with empty content and cursor
    responseContent.innerHTML = '<span class="typing-cursor"></span>';
    
    function typeNextChar() {
        if (currentIndex < fullText.length) {
            const char = fullText[currentIndex];
            
            // Get current text without cursor
            const currentText = fullText.substring(0, currentIndex + 1);
            
            // Convert to display HTML on the fly
            let displayHTML = currentText
                .replace(/\n\n/g, '<br><br>')
                .replace(/• /g, '• ');
            
            // Add cursor and update content
            responseContent.innerHTML = displayHTML + '<span class="typing-cursor"></span>';
            
            currentIndex++;
            setTimeout(typeNextChar, typingSpeed);
        } else {
            // Animation complete - remove cursor and set final formatted HTML
            responseContent.innerHTML = finalHTML;
            
            // Show feedback buttons after typing is complete
            const feedbackButtons = document.getElementById('feedbackButtons');
            if (feedbackButtons) {
                feedbackButtons.style.display = 'flex';
            }
            
            console.log('Typing animation completed');
        }
    }
    
    // Start typing after a brief delay
    setTimeout(typeNextChar, 500);
}

// Page Navigation Functions - Make them global
window.showDetailPage = function() {
    console.log('showDetailPage called');
    const mainPage = document.getElementById('mainHelpPage');
    const detailPage = document.getElementById('detailHelpPage');
    
    console.log('Main page element:', mainPage);
    console.log('Detail page element:', detailPage);
    
    if (mainPage && detailPage) {
        mainPage.style.display = 'none';
        detailPage.style.display = 'block';
        console.log('Page navigation completed - detail page should be visible');
        
        // Start the AI thinking and response animation
        startAIResponse();
    } else {
        console.log('ERROR: Could not find main page or detail page elements');
    }
};

window.showDetailPageWithGreyMessage = function() {
    console.log('showDetailPageWithGreyMessage called');
    const mainPage = document.getElementById('mainHelpPage');
    const detailPage = document.getElementById('detailHelpPage');
    
    if (mainPage && detailPage) {
        mainPage.style.display = 'none';
        detailPage.style.display = 'block';
        console.log('Page navigation completed - detail page with grey message should be visible');
        
        // Show grey message instead of the user question
        showGreyMessage();
    } else {
        console.log('ERROR: Could not find main page or detail page elements');
    }
};

window.showMainPage = function() {
    console.log('showMainPage called');
    const mainPage = document.getElementById('mainHelpPage');
    const detailPage = document.getElementById('detailHelpPage');
    
    console.log('Main page element:', mainPage);
    console.log('Detail page element:', detailPage);
    
    if (mainPage && detailPage) {
        mainPage.style.display = 'block';
        detailPage.style.display = 'none';
        console.log('Page navigation completed - main page should be visible');
        
        // Reset the AI response animation state
        resetAIResponseState();
    } else {
        console.log('ERROR: Could not find main page or detail page elements');
    }
};

function resetAIResponseState() {
    const aiThinking = document.getElementById('aiThinking');
    const assistantResponse = document.getElementById('assistantResponse');
    const responseContent = document.getElementById('responseContent');
    const feedbackButtons = document.getElementById('feedbackButtons');
    
    if (aiThinking && assistantResponse && responseContent) {
        // Reset to initial state
        aiThinking.style.display = 'flex';
        assistantResponse.style.display = 'none';
        responseContent.innerHTML = '';
        
        // Hide feedback buttons
        if (feedbackButtons) {
            feedbackButtons.style.display = 'none';
        }
        
        // Restore original user message
        restoreOriginalUserMessage();
        
        console.log('AI response state reset');
    }
}

function restoreOriginalUserMessage() {
    const userMessageContainer = document.querySelector('.user-message-container');
    
    if (userMessageContainer) {
        // Restore the original user message
        userMessageContainer.innerHTML = `
            <div class="user-message">
                <p>How does Sales Assistant work</p>
            </div>
        `;
        console.log('Original user message restored');
    }
}

function showGreyMessage() {
    console.log('Showing grey message');
    
    // Find the user message container
    const userMessageContainer = document.querySelector('.user-message-container');
    
    if (userMessageContainer) {
        // Replace the content with a grey message card
        userMessageContainer.innerHTML = `
            <div class="grey-message">
                <p>Any follow-up questions I can help with?</p>
            </div>
        `;
        
        // Ensure the grey message container is left-aligned
        userMessageContainer.style.display = 'flex';
        userMessageContainer.style.justifyContent = 'flex-start';
        
        // Add specific styles for the grey message
        const style = document.createElement('style');
        style.textContent = `
            .grey-message {
                background: #F5F5F5;
                border-radius: 16px;
                padding: 18px 16px;
                width: fit-content;
                max-width: calc(100% - 16px);
                margin-right: 16px;
                word-wrap: break-word;
                overflow-wrap: break-word;
                font-family: 'SF Pro Text', -apple-system, BlinkMacSystemFont, sans-serif;
                font-size: 14px;
                font-weight: 400;
                line-height: 1.25;
                color: rgba(0, 0, 0, 0.9);
                margin: 0 16px 0 0;
            }
            
            .grey-message p {
                margin: 0;
                font-family: 'SF Pro Text', -apple-system, BlinkMacSystemFont, sans-serif;
                font-size: 14px;
                font-weight: 400;
                line-height: 1.25;
                color: rgba(0, 0, 0, 0.9);
            }
        `;
        
        // Check if style already exists to avoid duplicates
        if (!document.querySelector('style[data-grey-message]')) {
            style.setAttribute('data-grey-message', 'true');
            document.head.appendChild(style);
        }
        
        // Hide AI thinking and response animations
        const aiThinking = document.getElementById('aiThinking');
        const assistantResponse = document.getElementById('assistantResponse');
        
        if (aiThinking) aiThinking.style.display = 'none';
        if (assistantResponse) assistantResponse.style.display = 'none';
        
        console.log('Grey message displayed');
    } else {
        console.log('ERROR: Could not find user message container');
    }
}

// Initialize handlers when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM Content Loaded - setting up event delegation');
    
    // Use event delegation on the help panel for link clicks
    const helpPanel = document.getElementById('helpPanel');
    console.log('Help panel found:', helpPanel);
    
    if (helpPanel) {
        helpPanel.addEventListener('click', function(e) {
            console.log('Click detected on help panel:', e.target);
            console.log('Clicked element classes:', e.target.className);
            console.log('Clicked element text:', e.target.textContent);
            
            // Check if clicked element is a link item
            const linkItem = e.target.closest('.link-item');
            console.log('Found link item:', linkItem);
            
            if (linkItem) {
                const linkText = linkItem.textContent.replace(/\s+/g, ' ').trim();
                console.log('Link item text content:', `"${linkText}"`);
                console.log('Checking if includes: "How does Sales Assistant work"');
                
                if (linkText.includes('How does Sales Assistant work')) {
                    e.preventDefault();
                    console.log('Sales Assistant link clicked - navigating to detail page');
                    showDetailPage();
                } else {
                    console.log('Link clicked but not the Sales Assistant link. Text was:', `"${linkText}"`);
                }
            }
            
            // Handle back button clicks
            if (e.target.closest('.back-button') || e.target.closest('#backButton')) {
                e.preventDefault();
                console.log('Back button clicked');
                showMainPage();
            }
            
            // Handle close button clicks for detail page
            if (e.target.closest('#closeHelpDetail')) {
                console.log('Close detail button clicked');
                closeHelpPanel();
                setTimeout(() => {
                    showMainPage();
                }, 300);
            }
        });
    } else {
        console.log('Help panel not found!');
    }
});
    
    // Add hover effects to buttons
    const buttons = document.querySelectorAll('.btn-primary, .btn-secondary, .btn-view');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            button.style.transform = 'translateY(-1px)';
        });
        
        button.addEventListener('mouseleave', () => {
            button.style.transform = 'translateY(0)';
        });
    });
    
    // Add click handlers for filter pills
    const filterPills = document.querySelectorAll('.filter-pill');
    filterPills.forEach(pill => {
        pill.addEventListener('click', () => {
            // Remove active class from all pills
            filterPills.forEach(p => p.classList.remove('active'));
            // Add active class to clicked pill
            pill.classList.add('active');
        });
    });
    
    // Add click handlers for tabs
    const tabs = document.querySelectorAll('.tab');
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active class from all tabs
            tabs.forEach(t => t.classList.remove('active'));
            // Add active class to clicked tab
            tab.classList.add('active');
        });
    });
    
    // Add animations to cards
    const cards = document.querySelectorAll('.sidebar-card, .highlights-card, .alerts-feed');
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-2px)';
            card.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
            card.style.boxShadow = '0 1px 3px rgba(0,0,0,0.1)';
        });
    });
});

// Follow-up input functionality
function handleFollowUpMessage() {
    const followUpInput = document.querySelector('.follow-up-input');
    const sendButton = document.querySelector('.send-button');
    const chatContainer = document.querySelector('.chat-container');
    
    if (!followUpInput || !sendButton || !chatContainer) return;
    
    function sendMessage() {
        const message = followUpInput.value.trim();
        if (!message) return;
        
        // Create new user message element
        const newUserMessage = document.createElement('div');
        newUserMessage.className = 'user-message-container';
        newUserMessage.innerHTML = `
            <div class="user-message">
                <p>${message}</p>
            </div>
        `;
        
        // Insert the new message before the follow-up container
        const followUpContainer = document.querySelector('.follow-up-container');
        if (followUpContainer) {
            chatContainer.insertBefore(newUserMessage, followUpContainer);
        } else {
            chatContainer.appendChild(newUserMessage);
        }
        
        // Clear the input
        followUpInput.value = '';
        
        // Generate AI response after a short delay
        setTimeout(() => {
            generateAIResponse(message, chatContainer);
        }, 1000);
        
        // Scroll to bottom to show new message
        const detailContent = document.querySelector('.detail-content');
        if (detailContent) {
            setTimeout(() => {
                detailContent.scrollTop = detailContent.scrollHeight;
            }, 100);
        }
        
        console.log('New message sent:', message);
    }
    
    // Handle Enter key press
    followUpInput.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            sendMessage();
        }
    });
    
    // Handle send button click
    sendButton.addEventListener('click', function(e) {
        e.preventDefault();
        sendMessage();
    });
}

// AI Response Generation
function generateAIResponse(userMessage, chatContainer) {
    // Create AI response container
    const aiResponseContainer = document.createElement('div');
    aiResponseContainer.className = 'ai-response-container';
    aiResponseContainer.style.display = 'flex';
    aiResponseContainer.style.justifyContent = 'flex-start'; // Left-align AI responses
    
    // Generate intelligent response based on user input
    const response = generateIntelligentResponse(userMessage);
    
    aiResponseContainer.innerHTML = `
        <div class="ai-response-message">
            <p>${response}</p>
        </div>
    `;
    
    // Insert before follow-up container
    const followUpContainer = document.querySelector('.follow-up-container');
    if (followUpContainer) {
        chatContainer.insertBefore(aiResponseContainer, followUpContainer);
    } else {
        chatContainer.appendChild(aiResponseContainer);
    }
    
    // Add styles for AI response message (grey style)
    if (!document.querySelector('style[data-ai-response]')) {
        const style = document.createElement('style');
        style.setAttribute('data-ai-response', 'true');
        style.textContent = `
            .ai-response-message {
                background: #F5F5F5;
                border-radius: 16px;
                padding: 18px 16px;
                width: fit-content;
                max-width: calc(100% - 16px);
                word-wrap: break-word;
                overflow-wrap: break-word;
                font-family: 'SF Pro Text', -apple-system, BlinkMacSystemFont, sans-serif;
                font-size: 14px;
                font-weight: 400;
                line-height: 1.25;
                color: rgba(0, 0, 0, 0.9);
                margin: 0 16px 0 0;
            }
            
            .ai-response-message p {
                margin: 0;
                font-family: 'SF Pro Text', -apple-system, BlinkMacSystemFont, sans-serif;
                font-size: 14px;
                font-weight: 400;
                line-height: 1.25;
                color: rgba(0, 0, 0, 0.9);
            }
        `;
        document.head.appendChild(style);
    }
    
    // Scroll to show new response
    const detailContent = document.querySelector('.detail-content');
    if (detailContent) {
        setTimeout(() => {
            detailContent.scrollTop = detailContent.scrollHeight;
        }, 200);
    }
}

// Intelligent Response Generator
function generateIntelligentResponse(userMessage) {
    const message = userMessage.toLowerCase();
    
    // Sales Navigator specific responses
    if (message.includes('lead') || message.includes('prospect')) {
        return "Sales Navigator uses AI to identify high-quality leads based on your saved searches, account preferences, and past engagement patterns. You can refine lead recommendations by providing feedback on suggested prospects.";
    }
    
    if (message.includes('search') || message.includes('filter')) {
        return "Use advanced search filters to narrow down prospects by location, industry, company size, seniority level, and more. Boolean search operators (AND, OR, NOT) help create precise queries for better targeting.";
    }
    
    if (message.includes('message') || message.includes('outreach') || message.includes('inmail')) {
        return "Craft personalized messages using insights from prospects' profiles, recent activity, and mutual connections. InMail credits allow you to reach prospects outside your network with higher response rates.";
    }
    
    if (message.includes('connect') || message.includes('network')) {
        return "Look for mutual connections, shared experiences, or common interests to establish rapport. Warm introductions through mutual connections typically have higher success rates than cold outreach.";
    }
    
    if (message.includes('account') || message.includes('company')) {
        return "Account pages provide comprehensive company insights including recent news, employee changes, and growth indicators. Use this intelligence to time your outreach and tailor your value proposition.";
    }
    
    if (message.includes('save') || message.includes('bookmark')) {
        return "Save interesting prospects and accounts to organized lists for ongoing relationship building. Set up alerts to stay informed about job changes, company updates, and other relevant activities.";
    }
    
    if (message.includes('premium') || message.includes('subscription')) {
        return "Sales Navigator Premium offers advanced search filters, unlimited people browsing, extended network access, and enhanced CRM integration capabilities to maximize your sales effectiveness.";
    }
    
    if (message.includes('crm') || message.includes('integration')) {
        return "Sync Sales Navigator with your CRM to maintain unified prospect data, track engagement history, and ensure your sales activities are properly documented across platforms.";
    }
    
    if (message.includes('tip') || message.includes('advice') || message.includes('help')) {
        return "Focus on building genuine relationships rather than immediate sales. Research prospects thoroughly, engage with their content, and provide value in your initial outreach to establish trust and credibility.";
    }
    
    if (message.includes('analytics') || message.includes('metrics') || message.includes('performance')) {
        return "Track your outreach performance through response rates, connection acceptance, and conversion metrics. Use this data to refine your messaging strategy and improve targeting accuracy.";
    }
    
    // General business/sales responses
    if (message.includes('strategy') || message.includes('plan')) {
        return "Develop a systematic approach by defining your ideal customer profile, setting daily activity goals, and consistently following up with prospects. Persistence and personalization are key to sales success.";
    }
    
    if (message.includes('time') || message.includes('efficiency')) {
        return "Maximize efficiency by batching similar activities, using templates for common scenarios, and leveraging automation tools while maintaining personal touches in your communications.";
    }
    
    // Default helpful response
    return "I'm here to help with Sales Navigator questions, prospecting strategies, and sales best practices. Feel free to ask about specific features, techniques, or challenges you're facing.";
}

// Add entrance animations
window.addEventListener('load', () => {
    // Create floating help button
    createFloatingHelpButton();
    
    // Initialize follow-up input functionality
    handleFollowUpMessage();
    
    // Animate cards on load
    const cards = document.querySelectorAll('.sidebar-card, .highlights-card, .alerts-feed');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100);
    });
}); 