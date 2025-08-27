// Reset all chat containers to initial state
function resetAllChatContainers() {
    console.log('Resetting all chat containers to initial state');
    
    // List of all chat containers with their reset elements
    const chatContainers = [
        {
            id: 'salesAssistantChat',
            thinkingId: 'aiThinking',
            responseId: 'assistantResponse',
            contentId: 'responseContent',
            feedbackId: 'feedbackButtons'
        },
        {
            id: 'messageAssistChat',
            thinkingId: 'messageAiThinking',
            responseId: 'messageAssistantResponse',
            contentId: 'messageResponseContent',
            feedbackId: 'messageFeedbackButtons'
        },
        {
            id: 'salesAssistantLeadsChat',
            thinkingId: 'salesLeadsAiThinking',
            responseId: 'salesLeadsAssistantResponse',
            contentId: 'salesLeadsResponseContent',
            feedbackId: 'salesLeadsFeedbackButtons'
        },
        {
            id: 'webinarToolsChat',
            thinkingId: 'webinarToolsAiThinking',
            responseId: 'webinarToolsAssistantResponse',
            contentId: 'webinarToolsResponseContent',
            feedbackId: 'webinarToolsFeedbackButtons'
        },
        {
            id: 'augustWebinarsChat',
            thinkingId: 'augustWebinarsAiThinking',
            responseId: 'augustWebinarsAssistantResponse',
            contentId: 'augustWebinarsResponseContent',
            feedbackId: 'augustWebinarsFeedbackButtons'
        },
        {
            id: 'accountIQChat',
            thinkingId: 'accountIQAiThinking',
            responseId: 'accountIQAssistantResponse',
            contentId: 'accountIQResponseContent',
            feedbackId: 'accountIQFeedbackButtons'
        }
    ];
    
    chatContainers.forEach(chat => {
        const thinkingElement = document.getElementById(chat.thinkingId);
        const responseElement = document.getElementById(chat.responseId);
        const contentElement = document.getElementById(chat.contentId);
        const feedbackElement = document.getElementById(chat.feedbackId);
        
        // Reset to initial state
        if (thinkingElement) {
            thinkingElement.style.display = 'none';
        }
        if (responseElement) {
            responseElement.style.display = 'none';
        }
        if (contentElement) {
            contentElement.innerHTML = '';
        }
        if (feedbackElement) {
            feedbackElement.style.display = 'none';
        }
    });
    
    // Reset icon chat containers (these use dynamic innerHTML)
    const iconChatContainers = ['salesAssistantIconChat', 'strategiesIconChat', 'innovationsIconChat'];
    iconChatContainers.forEach(chatId => {
        const chatElement = document.getElementById(chatId);
        if (chatElement) {
            chatElement.innerHTML = '';
        }
    });
    
    console.log('All chat containers reset to initial state');
}

// Helper function to hide all chat containers and show only one
function hideAllChatContainersExcept(activeContainerId) {
    console.log('Hiding all chat containers except:', activeContainerId);
    const allChatContainers = [
        'salesAssistantChat', 'messageAssistChat', 'salesAssistantLeadsChat', 
        'webinarToolsChat', 'augustWebinarsChat', 'accountIQChat', 'generalChat',
        'salesAssistantIconChat', 'strategiesIconChat', 'innovationsIconChat'
    ];
    
    allChatContainers.forEach(chatId => {
        const chatElement = document.getElementById(chatId);
        if (chatElement) {
            if (chatId === activeContainerId) {
                chatElement.style.display = 'block';
                console.log(`Showing chat container: ${chatId}`);
            } else {
                chatElement.style.display = 'none';
                console.log(`Hiding chat container: ${chatId}`);
            }
        }
    });
}

// Auto-scroll function for chat messages
function scrollChatToBottom() {
    console.log('scrollChatToBottom called');
    const scrollableContent = document.querySelector('.scrollable-content');
    console.log('scrollableContent element:', scrollableContent);
    if (scrollableContent) {
        console.log('Before scroll - scrollTop:', scrollableContent.scrollTop, 'scrollHeight:', scrollableContent.scrollHeight);
        // Force scroll to bottom immediately and with a small delay for DOM updates
        scrollableContent.scrollTop = scrollableContent.scrollHeight;
        console.log('After immediate scroll - scrollTop:', scrollableContent.scrollTop);
        setTimeout(() => {
            scrollableContent.scrollTop = scrollableContent.scrollHeight;
            console.log('After delayed scroll - scrollTop:', scrollableContent.scrollTop);
        }, 100);
    } else {
        console.log('scrollableContent not found!');
    }
}

// Configuration loading and management
let helpWidgetConfig = null;

async function loadConfiguration() {
    try {
        console.log('Loading help widget configuration...');
        const response = await fetch('./help-config.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        helpWidgetConfig = await response.json();
        console.log('Configuration loaded successfully:', helpWidgetConfig);
        console.log('Greeting from JSON:', helpWidgetConfig.greeting?.text);
        console.log('Recommendations count:', helpWidgetConfig.recommendations?.length);
        return helpWidgetConfig;
    } catch (error) {
        console.error('Failed to load configuration:', error);
        // Set fallback configuration
        helpWidgetConfig = {
            greeting: { text: "Hi Alice, you sent 15 InMails last week. Here are 2 recommendations to boost productivity" },
            recommendations: [
                {
                    "id": "rec1",
                    "title": "Streamline Your Hiring Process",
                    "description": "Connect with top talent more efficiently using<br>the AI-powered <span class=\"sales-assistant\">LinkedIn Hiring Assistant</span> for smarter recruiting.",
                    "buttonText": "Try Hiring Assistant",
                    "buttonAction": "",
                    "buttonUrl": "",
                    "links": [
                        {
                            "text": "How does Hiring Assistant work",
                            "action": "showDetailPage"
                        },
                        {
                            "text": "How to post a job with Hiring Assistant",
                            "action": "viewLeads"
                        }
                    ],
                    "expanded": true,
                    "chatFunction": "showDetailPageForSalesAssistant"
                },
                {
                    "id": "rec2", 
                    "title": "Discover New Sales Strategies",
                    "description": "Stay ahead and sign up for the Top 5 Sales Strategies webinar coming up on July 25 10AM. Learn advanced lead generation and smarter prospecting from industry experts.",
                    "buttonText": "Reserve a spot",
                    "buttonAction": "reserveSpot",
                    "buttonUrl": "https://training.sales.linkedin.com/live-introduction-to-sales-navigator",
                    "links": [
                        {
                            "text": "What tools will be featured",
                            "action": "viewSpeakers"
                        },
                        {
                            "text": "Any other webinars in August",
                            "action": "viewWebinars"
                        }
                    ],
                    "expanded": false,
                    "chatFunction": "showDetailPageForStrategies"
                }
            ],
            resources: { title: "Resources", links: [] },
            responses: {
                "salesAssistant": {
                    "question": "How does Hiring Assistant work",
                    "answer": "The LinkedIn Hiring Assistant is an AI-powered feature within LinkedIn Recruiter that helps streamline the hiring process. Here's an overview of its key functionalities:\n\nProject Creation:\nHiring Assistant allows you to create projects to find qualified candidates efficiently. You can start a project by providing details like job descriptions, ideal candidate profiles, or LinkedIn job post URLs.\n\nCandidate Sourcing:\nOnce a project is created, Hiring Assistant sources candidates based on the information provided. It recommends required and nice-to-have qualifications and can help you prescreen candidates.\n\nChat Experience:\nYou can interact with Hiring Assistant through a chat interface, where it helps refine your hiring criteria and suggests improvements to candidate quality.\n\nAI-Generated Messaging:\nHiring Assistant can send AI-generated messages to up to 25 candidates at once, enhancing your outreach efforts.\n\nFeedback Loop:\nThe system learns from your feedback on candidates, helping to improve future recommendations.\n\nCompliance and Security:\nLinkedIn ensures that Hiring Assistant adheres to responsible AI principles and complies with applicable laws and privacy regulations.\n\nIf you have any specific questions or need assistance with a particular feature, feel free to ask!"
                },
                "salesAssistantLeads": {
                    "question": "How to post a job with Hiring Assistant",
                    "answer": "To access candidates from Hiring Assistant in LinkedIn Recruiter, follow these steps:\\n\\n1. **Navigate to Your Projects:**\\n· Access your Hiring Assistant projects from the main dashboard in LinkedIn Recruiter.\\n\\n2. **Review Recommended Candidates:**\\n· In your project, the candidate pipeline will display profiles recommended by Hiring Assistant.\\n· Each recommended candidate includes details on why they were selected, such as alignment with your job requirements, skills match, and experience level.\\n\\n3. **Evaluate Candidates:**\\n· Select a specific candidate to view their full profile and assessment.\\n· To provide feedback on candidate fit:\\n  · Mark as \\\"Great fit\\\" to move them forward in your pipeline.\\n  · Mark as \\\"Not suitable\\\" to decline and help refine future recommendations.\\n\\n4. **Candidate Outreach:**\\n· For candidates you approve, Hiring Assistant can draft personalized InMail messages. You can:\\n  · Review and edit the draft before sending.\\n  · Send directly through LinkedIn Recruiter.\\n  · Save templates for future use.\\n\\n5. **Generate Additional Candidates:**\\n· To expand your candidate pool:\\n  · Use the \\\"Find more candidates\\\" option within your project.\\n  · Hiring Assistant will source additional profiles based on your feedback and criteria.\\n  · Daily sourcing limits may apply depending on your LinkedIn Recruiter plan.\\n\\nBy following these steps, you can efficiently manage candidates sourced by Hiring Assistant and optimize your recruiting workflow."
                },
                "webinarSpeakers": {
                    "question": "What tools will be featured",
                    "answer": "The LinkedIn Recruiter Mastery webinar will cover the following recruiting tools, designed to enhance talent acquisition and candidate sourcing.\\n\\n· **Advanced candidate search:** Quickly find qualified candidates with detailed search capabilities, including skills, experience, and location filters.\\n\\n· **Hiring Assistant:** Get AI-powered candidate recommendations and automated sourcing based on your job requirements and hiring patterns.\\n\\n· **InMail optimization:** Access insights and templates for crafting effective candidate outreach messages.\\n\\n· **Pipeline management:** Learn to organize and track candidates through your hiring process effectively.\\n\\nRegister for the webinar to learn how top recruiters are using these tools for smarter hiring."
                },
                "augustWebinars": {
                    "question": "Any other webinars in August",
                    "answer": "**August 2024 LinkedIn Recruiter Training Series**\n\n**📅 August 8, 2:00 PM PST**\n**\"Advanced Talent Sourcing Strategies\"**\n• Focus on passive candidate engagement\n• Multi-channel recruitment approaches\n• Building diverse talent pipelines\n\n**📅 August 15, 11:00 AM PST**\n**\"Recruiter Success Stories\"**\n• Real hiring case studies and results\n• Time-to-hire optimization metrics\n• Best practices from top talent teams\n\n**📅 August 22, 1:00 PM PST**\n**\"AI-Powered Recruiting Workshop\"**\n• Hands-on training with Hiring Assistant\n• InMail optimization techniques\n• Advanced search and Boolean strategies\n\n**🎁 Exclusive Benefits:**\n• All attendees receive 30-day Recruiter trial extension\n• Access to exclusive recruiting resource library\n• Priority beta access to new recruiting features"
                },
                "messageAssistReplies": {
                    "question": "Does InMail optimization boost candidate replies",
                    "answer": "**InMail Optimization Performance in LinkedIn Recruiter**\n\n**📊 Proven Results:**\n• **73% higher response rates** compared to generic candidate outreach\n• **2.3x more interview bookings** from initial InMails\n• **45% reduction in time** spent drafting personalized candidate messages\n• **85% user satisfaction** rating from LinkedIn Recruiter users\n\n**🎯 Why It Works:**\n• **Candidate-Focused Personalization** - Uses recent career activity and interests\n• **Industry-Specific Recruiting Language** - Adapts tone for different roles and sectors\n• **Optimal Timing Suggestions** - Recommends best send times for candidate engagement\n• **A/B Testing Built-In** - Learns from your candidate response patterns\n\n**📈 Performance by Message Type:**\n• **Initial InMails:** 68% response rate (vs 23% generic)\n• **Follow-Up Messages:** 41% response rate (vs 18% generic)\n• **Passive Candidate Outreach:** 29% response rate (vs 12% generic)\n\n**⚡ Quick Setup:** Available in all LinkedIn Recruiter plans, activate in Settings → InMail Optimization"
                },
                "accountIQInsights": {
                    "question": "What insights does Account IQ provide",
                    "answer": "**Account IQ Intelligence Dashboard**\n\n**📊 Business Health Signals**\n• **Financial Performance** - Revenue trends, growth patterns, funding events\n• **Market Position** - Competitive landscape analysis, market share data\n• **Operational Changes** - Leadership changes, reorganizations, office moves\n\n**🎯 Buyer Intent Scoring**\n• **High Intent Signals** - Job postings, technology searches, competitor research\n• **Medium Intent Signals** - Content engagement, industry event attendance\n• **Timing Indicators** - Budget cycles, contract renewal periods\n\n**📈 Growth Opportunity Analysis**\n• **Expansion Signals** - New office locations, team growth, product launches\n• **Partnership Opportunities** - Strategic alliances, vendor relationships\n• **Investment Activity** - Funding rounds, M&A activity, capital expenditure\n\n**🎨 Visualization Features**\n• **Interactive Dashboards** - Customizable views by priority and risk level\n• **Trend Analysis** - Historical data and predictive modeling\n• **Alert System** - Real-time notifications for significant changes"
                }
            }
        };
        return helpWidgetConfig;
    }
}

function generateHelpContent() {
    const currentConfig = getHelpConfiguration();
    if (!currentConfig) {
        console.error('Configuration not loaded yet');
        return;
    }
    
    console.log('Generating help content from configuration...', currentConfig);
    
    // Update greeting
    const greetingElement = document.querySelector('.help-greeting p');
    console.log('Found greeting element:', !!greetingElement);
    console.log('Current greeting element text:', greetingElement?.textContent);
    console.log('About to set greeting to:', currentConfig.greeting?.text);
    
    if (greetingElement && currentConfig.greeting) {
        console.log('Updating greeting with:', currentConfig.greeting.text);
        greetingElement.textContent = currentConfig.greeting.text;
        console.log('After update, greeting element text:', greetingElement.textContent);
    } else {
        console.error('Greeting element not found or greeting data missing', {
            greetingElement: !!greetingElement,
            greetingData: !!currentConfig.greeting
        });
    }
    
    // Generate recommendation cards
    generateRecommendationCards();
    
    // Show/hide open cases section and related divider based on use case
    const openCasesSection = document.querySelector('.open-cases-section');
    const helpDivider = document.querySelector('.help-divider');
    const activeUseCase = getActiveUseCase();
    
    if (activeUseCase === 'onboarding') {
        // Hide open cases section and the divider above "We're here to help"
        if (openCasesSection) openCasesSection.style.display = 'none';
        if (helpDivider) helpDivider.style.display = 'none';
    } else {
        // Show both for growth use case
        if (openCasesSection) openCasesSection.style.display = 'block';
        if (helpDivider) helpDivider.style.display = 'block';
    }
    
    // Generate resource links
    generateResourceLinks();
    
    console.log('Help content generated successfully');
}

function generateRecommendationCards() {
    console.log('generateRecommendationCards called');
    const currentConfig = getHelpConfiguration();
    const recommendationsContainer = document.querySelector('.recommendations');
    console.log('recommendationsContainer found:', !!recommendationsContainer);
    console.log('currentConfig:', currentConfig);
    
    if (!recommendationsContainer) {
        console.error('Recommendations container not found');
        return;
    }
    
    // Clear existing content
    recommendationsContainer.innerHTML = '';
    
    // Check if this is a checklist type (onboarding) or recommendations type (growth)
    if (currentConfig.type === 'checklist' && currentConfig.checklist) {
        generateChecklistContent(recommendationsContainer, currentConfig.checklist);
        return;
    }
    
    // Default recommendation cards generation
    if (!currentConfig.recommendations) {
        console.error('No recommendations data found');
        return;
    }
    
    // Generate each recommendation card
    currentConfig.recommendations.forEach((rec, index) => {
        const isExpanded = rec.expanded;
        const expandedClass = isExpanded ? 'expanded' : '';
        const chevronIcon = isExpanded ? 'fa-chevron-up' : 'fa-chevron-down';
        
        // Generate links HTML
        const linksHTML = rec.links.map(link => {
            let clickAction = 'return false;';
            
            // Make specific links clickable based on text content
            if (link.action === 'showDetailPage') {
                clickAction = 'showDetailPage(); return false;';
            } else if (link.text === 'Where to see leads from Sales Assistant') {
                clickAction = 'showDetailPageForSalesAssistantLeads(); return false;';
            } else if (link.text === 'What tools will be featured') {
                clickAction = 'showDetailPageForWebinarTools(); return false;';
            } else if (link.text === 'Any other webinars in August') {
                clickAction = 'showDetailPageForAugustWebinars(); return false;';
            } else if (link.text === 'Does Message Assist boost replies') {
                clickAction = 'showDetailPageForMessageAssist(); return false;';
            } else if (link.text === 'What insights does Account IQ provide') {
                clickAction = 'showDetailPageForAccountIQ(); return false;';
            }
            
            return `<a href="#" class="link-item" onclick="${clickAction}">
                <img src="sparkle.svg" alt="Sparkle" class="sparkle-icon">
                ${link.text}
            </a>`;
        }).join('');
        
        const cardHTML = `
            <div class="recommendation-item ${expandedClass}" id="${rec.id}">
                <div class="recommendation-header" onclick="toggleRecommendation('${rec.id}')">
                    <h3>${rec.title}</h3>
                    <i class="fas ${chevronIcon} expand-icon"></i>
                </div>
                <div class="recommendation-content">
                    <p>${rec.description}</p>
                    <div class="button-container">
                        <button class="btn-primary" onclick="${rec.buttonUrl ? `window.open('${rec.buttonUrl}', '_blank'); return false;` : 'return false;'}">${rec.buttonText}</button>
                        <div class="chat-icon" onclick="${rec.chatFunction}(); return false;">
                            <img src="Messages Active.svg" alt="Messages" class="chat-icon-svg">
                        </div>
                    </div>
                    <div class="recommendation-links">
                        ${linksHTML}
                    </div>
                </div>
            </div>
        `;
        
        recommendationsContainer.innerHTML += cardHTML;
    });
}

function generateChecklistContent(container, checklistData) {
    console.log('Generating checklist content:', checklistData);
    
    const checklistHTML = `
        <div class="onboarding-checklist">
            <div class="checklist-header">
                <h3 class="checklist-title">${checklistData.title}</h3>
                <p class="checklist-subtitle">${checklistData.subtitle}</p>
                <div class="progress-section">
                    <span class="progress-text">${checklistData.completedItems}/${checklistData.totalItems}</span>
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: ${(checklistData.completedItems / checklistData.totalItems) * 100}%"></div>
                    </div>
                </div>
            </div>
            <div class="checklist-items">
                ${checklistData.items.map(item => `
                    <div class="checklist-item ${item.completed ? 'completed' : ''}" data-item-id="${item.id}">
                        <div class="checklist-item-check">
                            <i class="fas fa-check"></i>
                        </div>
                        <div class="checklist-item-content">
                            <div class="checklist-item-title">${item.title}</div>
                            <div class="checklist-item-subtitle">${item.subtitle}</div>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
    
    container.innerHTML = checklistHTML;
    
    // Checklist items are now non-clickable
    // Click handlers removed
}

function toggleChecklistItem(itemId) {
    // Find the item in the onboarding config and toggle its completed state
    const item = onboardingHelpConfig.checklist.items.find(i => i.id === itemId);
    if (item) {
        item.completed = !item.completed;
        
        // Update completed count
        onboardingHelpConfig.checklist.completedItems = onboardingHelpConfig.checklist.items.filter(i => i.completed).length;
        
        // Regenerate the checklist to update UI
        generateRecommendationCards();
    }
}

function generateResourceLinks() {
    const resourcesContainer = document.querySelector('.help-resources');
    if (!resourcesContainer || !helpWidgetConfig.resources) {
        console.error('Resources container not found or no resources data');
        return;
    }
    
    // Update title
    const titleElement = resourcesContainer.querySelector('h3');
    if (titleElement) {
        titleElement.textContent = helpWidgetConfig.resources.title;
    }
    
    // Generate resource links
    const linksContainer = resourcesContainer.querySelector('.resource-links');
    if (linksContainer) {
        linksContainer.innerHTML = '';
        
        helpWidgetConfig.resources.links.forEach(link => {
            const linkHTML = `
                <a href="${link.url}" class="resource-link">
                    <i class="${link.icon}"></i>
                    ${link.text}
                </a>
            `;
            linksContainer.innerHTML += linkHTML;
        });
    }
}

function handleQuestionClick(recId, question) {
    console.log('Question clicked:', question, 'from recommendation:', recId);
    
    // Navigate to appropriate detail page based on recommendation
    if (recId === 'rec1') {
        showDetailPage();
    } else if (recId === 'rec2') {
        showDetailPageForStrategies();
    } else if (recId === 'rec3') {
        showDetailPageForInnovations();
    }
}

// DOM Elements
const helpPanel = document.getElementById('helpPanel');
const closeHelp = document.getElementById('closeHelp');

// State management
let isHelpPanelOpen = false;

// Floating help button removed - functionality moved to question mark icon in top nav

// Store the natural height of the first page
let naturalHeight = null;

// Help Panel Functions
function openHelpPanel() {
    if (helpPanel) {
        helpPanel.classList.add('open');
        isHelpPanelOpen = true;
        
        // Hide the notification badge when help panel opens
        hideBadge();
        
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
                
                if (link.textContent.includes('How does Hiring Assistant work')) {
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
                
                if (link.textContent.includes('Where to see leads from Sales Assistant')) {
                    console.log('Adding direct click handler to Sales Assistant Leads link');
                    
                    // Remove existing listeners
                    const newLink = link.cloneNode(true);
                    link.parentNode.replaceChild(newLink, link);
                    
                    newLink.addEventListener('click', function(e) {
                        e.preventDefault();
                        console.log('Direct Sales Assistant Leads click handler triggered!');
                        showDetailPageForSalesAssistantLeads();
                    });
                }
                
                if (link.textContent.includes('Does Message Assist boost replies')) {
                    console.log('Adding direct click handler to Message Assist link');
                    
                    // Remove existing listeners
                    const newLink = link.cloneNode(true);
                    link.parentNode.replaceChild(newLink, link);
                    
                    newLink.addEventListener('click', function(e) {
                        e.preventDefault();
                        console.log('Direct Message Assist click handler triggered!');
                        showDetailPageForMessageAssist();
                    });
                }
                
                if (link.textContent.includes('What tools will be featured')) {
                    console.log('Adding direct click handler to Webinar Tools link');
                    
                    // Remove existing listeners
                    const newLink = link.cloneNode(true);
                    link.parentNode.replaceChild(newLink, link);
                    
                    newLink.addEventListener('click', function(e) {
                        e.preventDefault();
                        console.log('Direct Webinar Tools click handler triggered!');
                        showDetailPageForWebinarTools();
                    });
                }
                
                if (link.textContent.includes('Any other webinars in August')) {
                    console.log('Adding direct click handler to August Webinars link');
                    
                    // Remove existing listeners
                    const newLink = link.cloneNode(true);
                    link.parentNode.replaceChild(newLink, link);
                    
                    newLink.addEventListener('click', function(e) {
                        e.preventDefault();
                        console.log('Direct August Webinars click handler triggered!');
                        showDetailPageForAugustWebinars();
                    });
                }
                
                if (link.textContent.includes('What insights does Account IQ provide')) {
                    console.log('Adding direct click handler to Account IQ link');
                    
                    // Remove existing listeners
                    const newLink = link.cloneNode(true);
                    link.parentNode.replaceChild(newLink, link);
                    
                    newLink.addEventListener('click', function(e) {
                        e.preventDefault();
                        console.log('Direct Account IQ click handler triggered!');
                        showDetailPageForAccountIQ();
                    });
                }
            });
            
            // Note: Chat icons use individual onclick attributes from HTML generation
            // No generic handler needed here
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
        !e.target.closest('.nav-icon-with-badge')) {
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

// Message Assist AI Response Animation - Works exactly like Sales Assistant
function startMessageAssistAIResponse() {
    console.log('=== startMessageAssistAIResponse called ===');
    console.log('helpWidgetConfig available:', !!helpWidgetConfig);
    console.log('helpWidgetConfig.responses available:', !!helpWidgetConfig?.responses);
    
    // Reset the response state for Message Assist
    const aiThinking = document.getElementById('messageAiThinking');
    const assistantResponse = document.getElementById('messageAssistantResponse');
    const responseContent = document.getElementById('messageResponseContent');
    
    console.log('Message Assist Elements found:', {
        aiThinking: !!aiThinking,
        assistantResponse: !!assistantResponse,
        responseContent: !!responseContent
    });
    
    if (aiThinking && assistantResponse && responseContent) {
        // Show thinking animation, hide response
        aiThinking.style.display = 'flex';
        assistantResponse.style.display = 'none';
        responseContent.innerHTML = '';
        
        // Auto-scroll when thinking animation appears
        scrollChatToBottom();
        
        // Show thinking for 2 seconds, then start typing response
        setTimeout(() => {
            hideMessageAssistThinkingAndStartTyping();
        }, 2000);
    } else {
        console.error('Missing required elements for Message Assist AI response');
    }
}

function hideMessageAssistThinkingAndStartTyping() {
    console.log('Hiding Message Assist thinking animation and starting typing');
    
    const aiThinking = document.getElementById('messageAiThinking');
    const assistantResponse = document.getElementById('messageAssistantResponse');
    const responseContent = document.getElementById('messageResponseContent');
    
    if (aiThinking && assistantResponse && responseContent) {
        // Hide thinking, show response container
        aiThinking.style.display = 'none';
        assistantResponse.style.display = 'flex';
        
        console.log('Message Assist response container shown');
        
        // Auto-scroll when response container appears
        scrollChatToBottom();
        
        // Start typing the Message Assist response
        typeMessageAssistResponse();
    }
}

function typeMessageAssistResponse() {
    const responseContent = document.getElementById('messageResponseContent');
    if (!responseContent) return;
    
    // Get the Message Assist response from JSON
    const answerText = findConfigResponse('Does Message Assist boost replies');
    
    if (!answerText) {
        console.error('No response found for Message Assist question');
        return;
    }
    
    console.log('Message Assist - Answer text received:', answerText.substring(0, 100) + '...');
    
    // Simple typing animation with the response
    const fullText = answerText.replace(/\*\*(.*?)\*\*/g, '$1');
    const finalHTML = answerText
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\n\n/g, '</p><p>')
        .replace(/\n/g, '<br>');
    
    let currentIndex = 0;
    responseContent.innerHTML = '<span class="typing-cursor"></span>';
    
    function typeNextChar() {
        if (currentIndex < fullText.length) {
            const currentText = fullText.substring(0, currentIndex + 1);
            responseContent.innerHTML = currentText.replace(/\n/g, '<br>') + '<span class="typing-cursor"></span>';
            currentIndex++;
            
            // Auto-scroll during typing to keep up with growing content
            if (currentIndex % 50 === 0) { // Scroll every 50 characters
                scrollChatToBottom();
            }
            
            setTimeout(typeNextChar, 25);
        } else {
            responseContent.innerHTML = `<p>${finalHTML}</p>`;
            const feedbackButtons = document.getElementById('messageFeedbackButtons');
            if (feedbackButtons) feedbackButtons.style.display = 'flex';
            console.log('Message Assist typing completed');
        }
    }
    
    setTimeout(typeNextChar, 500);
}

// Sales Assistant Leads AI Response Animation
function startSalesAssistantLeadsAIResponse() {
    console.log('=== startSalesAssistantLeadsAIResponse called ===');
    
    const aiThinking = document.getElementById('salesLeadsAiThinking');
    const assistantResponse = document.getElementById('salesLeadsAssistantResponse');
    const responseContent = document.getElementById('salesLeadsResponseContent');
    
    if (aiThinking && assistantResponse && responseContent) {
        aiThinking.style.display = 'flex';
        assistantResponse.style.display = 'none';
        responseContent.innerHTML = '';
        scrollChatToBottom();
        
        setTimeout(() => {
            aiThinking.style.display = 'none';
            assistantResponse.style.display = 'flex';
            scrollChatToBottom();
            typeSalesAssistantLeadsResponse();
        }, 2000);
    }
}

function typeSalesAssistantLeadsResponse() {
    const responseContent = document.getElementById('salesLeadsResponseContent');
    if (!responseContent) return;
    
    // Get the specific salesAssistantLeads response from JSON
    const answerText = helpWidgetConfig?.responses?.salesAssistantLeads?.answer;
    if (!answerText) {
        console.error('No salesAssistantLeads response found in helpWidgetConfig');
        return;
    }
    
    const fullText = answerText.replace(/\*\*(.*?)\*\*/g, '$1');
    const finalHTML = answerText.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\n/g, '<br>');
    
    let currentIndex = 0;
    responseContent.innerHTML = '<span class="typing-cursor"></span>';
    
    function typeNextChar() {
        if (currentIndex < fullText.length) {
            const currentText = fullText.substring(0, currentIndex + 1);
            responseContent.innerHTML = currentText.replace(/\n/g, '<br>') + '<span class="typing-cursor"></span>';
            currentIndex++;
            
            // Auto-scroll during typing to keep up with growing content
            if (currentIndex % 50 === 0) { // Scroll every 50 characters
                scrollChatToBottom();
            }
            
            setTimeout(typeNextChar, 25);
        } else {
            responseContent.innerHTML = `<p>${finalHTML}</p>`;
            const feedbackButtons = document.getElementById('salesLeadsFeedbackButtons');
            if (feedbackButtons) feedbackButtons.style.display = 'flex';
        }
    }
    
    setTimeout(typeNextChar, 500);
}

// Webinar Tools AI Response Animation
function startWebinarToolsAIResponse() {
    console.log('=== startWebinarToolsAIResponse called ===');
    
    const aiThinking = document.getElementById('webinarToolsAiThinking');
    const assistantResponse = document.getElementById('webinarToolsAssistantResponse');
    const responseContent = document.getElementById('webinarToolsResponseContent');
    
    if (aiThinking && assistantResponse && responseContent) {
        aiThinking.style.display = 'flex';
        assistantResponse.style.display = 'none';
        responseContent.innerHTML = '';
        scrollChatToBottom();
        
        setTimeout(() => {
            aiThinking.style.display = 'none';
            assistantResponse.style.display = 'flex';
            scrollChatToBottom();
            typeWebinarToolsResponse();
        }, 2000);
    }
}

function typeWebinarToolsResponse() {
    const responseContent = document.getElementById('webinarToolsResponseContent');
    if (!responseContent) return;
    
    const answerText = findConfigResponse('What tools will be featured');
    if (!answerText) return;
    
    const fullText = answerText.replace(/\*\*(.*?)\*\*/g, '$1');
    const finalHTML = answerText.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\n/g, '<br>');
    
    let currentIndex = 0;
    responseContent.innerHTML = '<span class="typing-cursor"></span>';
    
    function typeNextChar() {
        if (currentIndex < fullText.length) {
            const currentText = fullText.substring(0, currentIndex + 1);
            responseContent.innerHTML = currentText.replace(/\n/g, '<br>') + '<span class="typing-cursor"></span>';
            currentIndex++;
            
            // Auto-scroll during typing to keep up with growing content
            if (currentIndex % 50 === 0) { // Scroll every 50 characters
                scrollChatToBottom();
            }
            
            setTimeout(typeNextChar, 25);
        } else {
            responseContent.innerHTML = `<p>${finalHTML}</p>`;
            const feedbackButtons = document.getElementById('webinarToolsFeedbackButtons');
            if (feedbackButtons) feedbackButtons.style.display = 'flex';
        }
    }
    
    setTimeout(typeNextChar, 500);
}

// August Webinars AI Response Animation
function startAugustWebinarsAIResponse() {
    console.log('=== startAugustWebinarsAIResponse called ===');
    
    const aiThinking = document.getElementById('augustWebinarsAiThinking');
    const assistantResponse = document.getElementById('augustWebinarsAssistantResponse');
    const responseContent = document.getElementById('augustWebinarsResponseContent');
    
    if (aiThinking && assistantResponse && responseContent) {
        aiThinking.style.display = 'flex';
        assistantResponse.style.display = 'none';
        responseContent.innerHTML = '';
        scrollChatToBottom();
        
        setTimeout(() => {
            aiThinking.style.display = 'none';
            assistantResponse.style.display = 'flex';
            scrollChatToBottom();
            typeAugustWebinarsResponse();
        }, 2000);
    }
}

function typeAugustWebinarsResponse() {
    const responseContent = document.getElementById('augustWebinarsResponseContent');
    if (!responseContent) return;
    
    const answerText = findConfigResponse('Any other webinars in August');
    if (!answerText) return;
    
    const fullText = answerText.replace(/\*\*(.*?)\*\*/g, '$1');
    const finalHTML = answerText.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\n/g, '<br>');
    
    let currentIndex = 0;
    responseContent.innerHTML = '<span class="typing-cursor"></span>';
    
    function typeNextChar() {
        if (currentIndex < fullText.length) {
            const currentText = fullText.substring(0, currentIndex + 1);
            responseContent.innerHTML = currentText.replace(/\n/g, '<br>') + '<span class="typing-cursor"></span>';
            currentIndex++;
            
            // Auto-scroll during typing to keep up with growing content
            if (currentIndex % 50 === 0) { // Scroll every 50 characters
                scrollChatToBottom();
            }
            
            setTimeout(typeNextChar, 25);
        } else {
            responseContent.innerHTML = `<p>${finalHTML}</p>`;
            const feedbackButtons = document.getElementById('augustWebinarsFeedbackButtons');
            if (feedbackButtons) feedbackButtons.style.display = 'flex';
        }
    }
    
    setTimeout(typeNextChar, 500);
}

// Account IQ AI Response Animation
function startAccountIQAIResponse() {
    console.log('=== startAccountIQAIResponse called ===');
    
    const aiThinking = document.getElementById('accountIQAiThinking');
    const assistantResponse = document.getElementById('accountIQAssistantResponse');
    const responseContent = document.getElementById('accountIQResponseContent');
    
    if (aiThinking && assistantResponse && responseContent) {
        aiThinking.style.display = 'flex';
        assistantResponse.style.display = 'none';
        responseContent.innerHTML = '';
        scrollChatToBottom();
        
        setTimeout(() => {
            aiThinking.style.display = 'none';
            assistantResponse.style.display = 'flex';
            scrollChatToBottom();
            typeAccountIQResponse();
        }, 2000);
    }
}

function typeAccountIQResponse() {
    const responseContent = document.getElementById('accountIQResponseContent');
    if (!responseContent) return;
    
    const answerText = findConfigResponse('What insights does Account IQ provide');
    if (!answerText) return;
    
    const fullText = answerText.replace(/\*\*(.*?)\*\*/g, '$1');
    const finalHTML = answerText.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\n/g, '<br>');
    
    let currentIndex = 0;
    responseContent.innerHTML = '<span class="typing-cursor"></span>';
    
    function typeNextChar() {
        if (currentIndex < fullText.length) {
            const currentText = fullText.substring(0, currentIndex + 1);
            responseContent.innerHTML = currentText.replace(/\n/g, '<br>') + '<span class="typing-cursor"></span>';
            currentIndex++;
            
            // Auto-scroll during typing to keep up with growing content
            if (currentIndex % 50 === 0) { // Scroll every 50 characters
                scrollChatToBottom();
            }
            
            setTimeout(typeNextChar, 25);
        } else {
            responseContent.innerHTML = `<p>${finalHTML}</p>`;
            const feedbackButtons = document.getElementById('accountIQFeedbackButtons');
            if (feedbackButtons) feedbackButtons.style.display = 'flex';
        }
    }
    
    setTimeout(typeNextChar, 500);
}

// AI Response Animation
function startAIResponse() {
    console.log('=== startAIResponse called ===');
    console.log('helpWidgetConfig available:', !!helpWidgetConfig);
    console.log('helpWidgetConfig.responses available:', !!helpWidgetConfig?.responses);
    
    // Reset the response state
    const aiThinking = document.getElementById('aiThinking');
    const assistantResponse = document.getElementById('assistantResponse');
    const responseContent = document.getElementById('responseContent');
    
    console.log('Elements found:', {
        aiThinking: !!aiThinking,
        assistantResponse: !!assistantResponse,
        responseContent: !!responseContent
    });
    
    if (aiThinking && assistantResponse && responseContent) {
        // Show thinking animation, hide response
        aiThinking.style.display = 'flex';
        assistantResponse.style.display = 'none';
        responseContent.innerHTML = '';
        
        // Auto-scroll when thinking animation appears
        scrollChatToBottom();
        
        // Show thinking for 2 seconds, then start typing response
        setTimeout(() => {
            hideThinkingAndStartTyping();
        }, 2000);
    } else {
        console.error('Missing required elements for AI response');
    }
}

function hideThinkingAndStartTyping() {
    console.log('Hiding thinking animation and starting typing');
    
    const aiThinking = document.getElementById('aiThinking');
    const assistantResponse = document.getElementById('assistantResponse');
    
    // Check for either responseContent element (Sales Assistant or General chat)
    let responseContent = document.getElementById('responseContent') || document.getElementById('generalResponseContent');
    
    console.log('hideThinkingAndStartTyping - Elements found:', {
        aiThinking: !!aiThinking,
        assistantResponse: !!assistantResponse,
        responseContent: !!responseContent
    });
    
    if (aiThinking && assistantResponse && responseContent) {
        // Hide thinking, show response container
        aiThinking.style.display = 'none';
        assistantResponse.style.display = 'flex';
        
        console.log('hideThinkingAndStartTyping - Showing assistantResponse container');
        
        // Auto-scroll when response container appears
        scrollChatToBottom();
        
        // Start typing the response
        typeResponse();
    } else {
        console.error('hideThinkingAndStartTyping - Missing required elements');
    }
}

function typeResponse() {
    // Find the currently visible chat container and its responseContent
    const salesAssistantChat = document.getElementById('salesAssistantChat');
    const generalChat = document.getElementById('generalChat');
    
    let responseContent = null;
    let activeChat = null;
    
    // Determine which chat is currently visible
    if (salesAssistantChat && salesAssistantChat.style.display !== 'none') {
        activeChat = salesAssistantChat;
        responseContent = document.getElementById('responseContent'); // Sales Assistant uses the original ID
        console.log('typeResponse - Using Sales Assistant chat responseContent');
    } else if (generalChat && generalChat.style.display !== 'none') {
        activeChat = generalChat;
        responseContent = document.getElementById('generalResponseContent'); // General chat uses unique ID
        console.log('typeResponse - Using General chat responseContent');
    }
    
    if (!responseContent) {
        console.error('typeResponse - No responseContent found in active chat');
        return;
    }
    
    console.log('typeResponse - Active chat:', activeChat.id);
    console.log('typeResponse - Response content element:', responseContent);
    
    let lastUserMessage = '';
    
    // Find the last user message from the active chat container
    if (activeChat) {
        const userMessages = activeChat.querySelectorAll('.user-message p');
        if (userMessages.length > 0) {
            lastUserMessage = userMessages[userMessages.length - 1]?.textContent || '';
        }
    }
    
    console.log('typeResponse - Last user message found:', lastUserMessage);
    
    // Use the findConfigResponse function to get the answer
    const answerText = findConfigResponse(lastUserMessage);
    
    if (!answerText) {
        console.error('No response found for question:', lastUserMessage);
        return;
    }
    
    console.log('typeResponse - Answer text received:', answerText ? answerText.substring(0, 100) + '...' : 'null');
    
    // Create a response data object with the answer
    const responseData = { answer: answerText };
    
    // Convert markdown-like formatting to plain text for typing
    const fullText = responseData.answer
        .replace(/\*\*(.*?)\*\*/g, '$1') // Remove bold markers for typing
        .replace(/\n\n/g, '\n\n') // Keep paragraph breaks
        .replace(/•/g, '•'); // Keep bullet points
    
    console.log('typeResponse - Full text length:', fullText.length);
    console.log('typeResponse - Full text preview:', fullText.substring(0, 100) + '...');
    
    // Convert markdown to HTML for final display
    const finalHTML = responseData.answer
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') // Convert bold
        .replace(/\n\n/g, '</p><p>') // Convert paragraphs
        .replace(/\n• /g, '<br>• ') // Convert bullet points
        .replace(/\n/g, '<br>'); // Convert line breaks
    
    // Wrap in paragraph tags
    const formattedHTML = `<p>${finalHTML}</p>`;
    
    let currentIndex = 0;
    const typingSpeed = 25; // milliseconds per character
    
    // Start with empty content and cursor
    responseContent.innerHTML = '<span class="typing-cursor"></span>';
    console.log('typeResponse - Starting typing animation, responseContent element:', responseContent);
    
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
            
            // Debug: Log first few characters
            if (currentIndex < 5) {
                console.log(`Typing char ${currentIndex}: "${char}", current text: "${currentText.substring(0, 20)}..."`);
            }
            
            // Auto-scroll during typing to keep up with growing content
            if (currentIndex % 50 === 0) { // Scroll every 50 characters
                scrollChatToBottom();
            }
            
            currentIndex++;
            setTimeout(typeNextChar, typingSpeed);
        } else {
            // Animation complete - remove cursor and set final formatted HTML
            responseContent.innerHTML = formattedHTML;
            
            console.log('typeResponse - Final HTML set:', formattedHTML.substring(0, 100) + '...');
            
            // Show feedback buttons after typing is complete
            const feedbackButtons = document.getElementById('feedbackButtons');
            if (feedbackButtons) {
                feedbackButtons.style.display = 'flex';
            }
            
            // Auto-scroll when typing is complete
            scrollChatToBottom();
            
            console.log('Typing animation completed');
        }
    }
    
    // Start typing after a brief delay
    setTimeout(typeNextChar, 500);
}

// Page Navigation Functions - Make them global
window.showDetailPage = function() {
    console.log('showDetailPage called - Sales Assistant thread');
    
    // Reset all chat containers to ensure clean state
    resetAllChatContainers();
    
    const mainPage = document.getElementById('mainHelpPage');
    const detailPage = document.getElementById('detailHelpPage');
    const salesAssistantChat = document.getElementById('salesAssistantChat');
    const generalChat = document.getElementById('generalChat');
    
    console.log('Main page element:', mainPage);
    console.log('Detail page element:', detailPage);
    
    if (mainPage && detailPage) {
        mainPage.style.display = 'none';
        detailPage.style.display = 'block';
        
        // Hide all chat containers and show only Sales Assistant
        hideAllChatContainersExcept('salesAssistantChat');
        
        console.log('Page navigation completed - Sales Assistant chat thread visible');
        
        // Start the AI thinking and response animation
        startAIResponse();
        
        // Initialize follow-up input functionality for Sales Assistant thread
        setTimeout(() => {
            handleFollowUpMessage('salesAssistantChat');
        }, 100);
    } else {
        console.log('ERROR: Could not find main page or detail page elements');
    }
};

window.showDetailPageForMessageAssist = function() {
    console.log('showDetailPageForMessageAssist called - Message Assist thread');
    
    // Reset all chat containers to ensure clean state
    resetAllChatContainers();
    
    const mainPage = document.getElementById('mainHelpPage');
    const detailPage = document.getElementById('detailHelpPage');
    const salesAssistantChat = document.getElementById('salesAssistantChat');
    const salesAssistantLeadsChat = document.getElementById('salesAssistantLeadsChat');
    const messageAssistChat = document.getElementById('messageAssistChat');
    const webinarToolsChat = document.getElementById('webinarToolsChat');
    const augustWebinarsChat = document.getElementById('augustWebinarsChat');
    const accountIQChat = document.getElementById('accountIQChat');
    const generalChat = document.getElementById('generalChat');
    
    console.log('Main page element:', mainPage);
    console.log('Detail page element:', detailPage);
    
    if (mainPage && detailPage) {
        mainPage.style.display = 'none';
        detailPage.style.display = 'block';
        
        // Hide all chat containers and show only Message Assist
        hideAllChatContainersExcept('messageAssistChat');
        
        console.log('Page navigation completed - Message Assist chat thread visible');
        
        // Start the AI thinking and response animation for Message Assist
        startMessageAssistAIResponse();
        
        // Initialize follow-up input functionality for Message Assist thread
        setTimeout(() => {
            handleFollowUpMessage('messageAssistChat');
        }, 100);
    } else {
        console.log('ERROR: Could not find main page or detail page elements');
    }
};

window.showDetailPageWithGreyMessage = function() {
    console.log('showDetailPageWithGreyMessage called - General chat thread');
    const mainPage = document.getElementById('mainHelpPage');
    const detailPage = document.getElementById('detailHelpPage');
    const salesAssistantChat = document.getElementById('salesAssistantChat');
    const generalChat = document.getElementById('generalChat');
    
    if (mainPage && detailPage) {
        mainPage.style.display = 'none';
        detailPage.style.display = 'block';
        
        // Hide all chat containers and show only general chat
        hideAllChatContainersExcept('generalChat');
        
        console.log('Page navigation completed - General chat thread visible');
        
        // Initialize follow-up input functionality for general chat thread
        setTimeout(() => {
            handleFollowUpMessage('generalChat');
        }, 100);
    } else {
        console.log('ERROR: Could not find main page or detail page elements');
    }
};

// Generic function to show detail page with specific question
function showDetailPageWithQuestion(questionText, questionType, recommendationId) {
    console.log(`showDetailPageWithQuestion called - ${questionType} chat thread`);
    const mainPage = document.getElementById('mainHelpPage');
    const detailPage = document.getElementById('detailHelpPage');
    const salesAssistantChat = document.getElementById('salesAssistantChat');
    const generalChat = document.getElementById('generalChat');
    
    if (mainPage && detailPage) {
        mainPage.style.display = 'none';
        detailPage.style.display = 'block';
        
        // Choose which chat container to use
        let chatContainer, otherContainer;
        if (recommendationId === 'rec1') {
            chatContainer = salesAssistantChat;
            otherContainer = generalChat;
        } else {
            chatContainer = generalChat;
            otherContainer = salesAssistantChat;
        }
        
        // Show appropriate chat thread
        if (chatContainer) chatContainer.style.display = 'block';
        if (otherContainer) otherContainer.style.display = 'none';
        
        // Get recommendation data
        const rec = helpWidgetConfig?.recommendations?.find(r => r.id === recommendationId);
        if (rec) {
            // Generate links HTML
            const linksHTML = rec.links.map(link => 
                `<div class="link-item-static">
                    <img src="sparkle.svg" alt="Sparkle" class="sparkle-icon">
                    ${link.text}
                </div>`
            ).join('');
            
            // Create chat content with the exact same structure as Sales Assistant
            chatContainer.innerHTML = `
                <div class="recommendation-card">
                    <h3>${rec.title}</h3>
                    <p>${rec.description}</p>
                    <div class="button-container">
                        <button class="btn-primary">${rec.buttonText}</button>
                    </div>
                    <div class="recommendation-links">
                        ${linksHTML}
                    </div>
                </div>
                <div class="user-message-container">
                    <div class="user-message">
                        <p>${questionText}</p>
                    </div>
                </div>
                        
                <!-- AI Thinking Animation -->
                <div class="ai-thinking-container" id="aiThinking">
                    <div class="ai-thinking">
                        <div class="thinking-dots">
                            <span class="thinking-dot"></span>
                            <span class="thinking-dot"></span>
                            <span class="thinking-dot"></span>
                        </div>
                    </div>
                </div>

                <!-- Assistant Response -->
                <div class="assistant-response-container" id="assistantResponse" style="display: none;">
                    <div class="assistant-response">
                        <div class="response-content" id="generalResponseContent">
                            <!-- Content will be typed in by animation -->
                        </div>
                        <div class="feedback-buttons" id="feedbackButtons" style="display: none;">
                            <button class="feedback-btn thumbs-up" title="Helpful">
                                <i class="fas fa-thumbs-up"></i>
                            </button>
                            <button class="feedback-btn thumbs-down" title="Not helpful">
                                <i class="fas fa-thumbs-down"></i>
                            </button>
                        </div>
                    </div>
                </div>
            `;
        }
        
        console.log(`Page navigation completed - ${questionType} chat thread visible`);
        
        // Start the AI response after a short delay
        setTimeout(() => {
            startAIResponse();
        }, 500);
        
        // Initialize follow-up input functionality
        const chatId = chatContainer.id;
        setTimeout(() => {
            handleFollowUpMessage(chatId);
        }, 100);
    } else {
        console.log('ERROR: Could not find main page or detail page elements');
    }
}

// Specific functions for each link





window.showDetailPageForSalesAssistantLeads = function() {
    console.log('showDetailPageForSalesAssistantLeads called - Sales Assistant Leads thread');
    
    // Reset all chat containers to ensure clean state
    resetAllChatContainers();
    
    const mainPage = document.getElementById('mainHelpPage');
    const detailPage = document.getElementById('detailHelpPage');
    const salesAssistantChat = document.getElementById('salesAssistantChat');
    const salesAssistantLeadsChat = document.getElementById('salesAssistantLeadsChat');
    const messageAssistChat = document.getElementById('messageAssistChat');
    const webinarToolsChat = document.getElementById('webinarToolsChat');
    const augustWebinarsChat = document.getElementById('augustWebinarsChat');
    const accountIQChat = document.getElementById('accountIQChat');
    const generalChat = document.getElementById('generalChat');
    
    if (mainPage && detailPage) {
        mainPage.style.display = 'none';
        detailPage.style.display = 'block';
        
        // Hide all chat containers and show only Sales Assistant Leads
        hideAllChatContainersExcept('salesAssistantLeadsChat');
        
        console.log('Page navigation completed - Sales Assistant Leads chat thread visible');
        
        startSalesAssistantLeadsAIResponse();
        
        setTimeout(() => {
            handleFollowUpMessage('salesAssistantLeadsChat');
        }, 100);
    }
};

window.showDetailPageForWebinarTools = function() {
    console.log('showDetailPageForWebinarTools called - Webinar Tools thread');
    
    // Reset all chat containers to ensure clean state
    resetAllChatContainers();
    
    const mainPage = document.getElementById('mainHelpPage');
    const detailPage = document.getElementById('detailHelpPage');
    const salesAssistantChat = document.getElementById('salesAssistantChat');
    const messageAssistChat = document.getElementById('messageAssistChat');
    const webinarToolsChat = document.getElementById('webinarToolsChat');
    const augustWebinarsChat = document.getElementById('augustWebinarsChat');
    const accountIQChat = document.getElementById('accountIQChat');
    const generalChat = document.getElementById('generalChat');
    
    if (mainPage && detailPage) {
        mainPage.style.display = 'none';
        detailPage.style.display = 'block';
        
        // Hide all chat containers and show only Webinar Tools
        hideAllChatContainersExcept('webinarToolsChat');
        
        console.log('Page navigation completed - Webinar Tools chat thread visible');
        
        startWebinarToolsAIResponse();
        
        setTimeout(() => {
            handleFollowUpMessage('webinarToolsChat');
        }, 100);
    }
};

window.showDetailPageForAugustWebinars = function() {
    console.log('showDetailPageForAugustWebinars called - August Webinars thread');
    
    // Reset all chat containers to ensure clean state
    resetAllChatContainers();
    
    const mainPage = document.getElementById('mainHelpPage');
    const detailPage = document.getElementById('detailHelpPage');
    const salesAssistantChat = document.getElementById('salesAssistantChat');
    const messageAssistChat = document.getElementById('messageAssistChat');
    const webinarToolsChat = document.getElementById('webinarToolsChat');
    const augustWebinarsChat = document.getElementById('augustWebinarsChat');
    const accountIQChat = document.getElementById('accountIQChat');
    const generalChat = document.getElementById('generalChat');
    
    if (mainPage && detailPage) {
        mainPage.style.display = 'none';
        detailPage.style.display = 'block';
        
        // Hide all chat containers and show only August Webinars
        hideAllChatContainersExcept('augustWebinarsChat');
        
        console.log('Page navigation completed - August Webinars chat thread visible');
        
        startAugustWebinarsAIResponse();
        
        setTimeout(() => {
            handleFollowUpMessage('augustWebinarsChat');
        }, 100);
    }
};

window.showDetailPageForAccountIQ = function() {
    console.log('showDetailPageForAccountIQ called - Account IQ thread');
    
    // Reset all chat containers to ensure clean state
    resetAllChatContainers();
    
    const mainPage = document.getElementById('mainHelpPage');
    const detailPage = document.getElementById('detailHelpPage');
    const salesAssistantChat = document.getElementById('salesAssistantChat');
    const messageAssistChat = document.getElementById('messageAssistChat');
    const webinarToolsChat = document.getElementById('webinarToolsChat');
    const augustWebinarsChat = document.getElementById('augustWebinarsChat');
    const accountIQChat = document.getElementById('accountIQChat');
    const generalChat = document.getElementById('generalChat');
    
    if (mainPage && detailPage) {
        mainPage.style.display = 'none';
        detailPage.style.display = 'block';
        
        // Hide all chat containers and show only Account IQ
        hideAllChatContainersExcept('accountIQChat');
        
        console.log('Page navigation completed - Account IQ chat thread visible');
        
        startAccountIQAIResponse();
        
        setTimeout(() => {
            handleFollowUpMessage('accountIQChat');
        }, 100);
    }
};



window.showDetailPageForSalesAssistant = function() {
    console.log('=== showDetailPageForSalesAssistant called - Sales Assistant Icon chat thread ===');
    
    // Reset all chat containers to ensure clean state
    resetAllChatContainers();
    
    const mainPage = document.getElementById('mainHelpPage');
    const detailPage = document.getElementById('detailHelpPage');
    const salesAssistantIconChat = document.getElementById('salesAssistantIconChat');
    
    console.log('Elements found:', {
        mainPage: !!mainPage,
        detailPage: !!detailPage,
        salesAssistantIconChat: !!salesAssistantIconChat
    });
    
    if (mainPage && detailPage && salesAssistantIconChat) {
        mainPage.style.display = 'none';
        detailPage.style.display = 'block';
        
        // Hide all chat containers and show only Sales Assistant Icon chat
        hideAllChatContainersExcept('salesAssistantIconChat');
        
        // Clear previous chat and add Sales Assistant-specific content card (matching static chat)
        salesAssistantIconChat.innerHTML = `
            <div class="recommendation-card">
                <h3>Streamline Your Hiring Process</h3>
                <p>Connect with top talent more efficiently using the AI-powered LinkedIn <span class="sales-assistant">Hiring Assistant</span> for smarter recruiting.</p>
                <div class="button-container">
                    <button class="btn-primary" onclick="return false;">Try Hiring Assistant</button>
                </div>
                <div class="recommendation-links">
                    <div class="link-item-static">
                        <img src="sparkle.svg" alt="Sparkle" class="sparkle-icon">
                        How does Hiring Assistant work
                    </div>
                    <div class="link-item-static">
                        <img src="sparkle.svg" alt="Sparkle" class="sparkle-icon">
                        How to post a job with Hiring Assistant
                    </div>
                </div>
            </div>
            <div class="user-message-container grey-message-container">
                <div class="grey-message">
                    <p>Any follow-up questions about Hiring Assistant I can help with?</p>
                </div>
            </div>
        `;
        
        console.log('Sales Assistant icon chat content set successfully');
        console.log('Container innerHTML length:', salesAssistantIconChat.innerHTML.length);
        console.log('Container display style:', salesAssistantIconChat.style.display);
        console.log('Container visibility:', window.getComputedStyle(salesAssistantIconChat).display);
        
        console.log('Page navigation completed - Sales Assistant chat thread visible');
        
        // Initialize follow-up input functionality for Sales Assistant chat thread
        setTimeout(() => {
            handleFollowUpMessage('salesAssistantIconChat');
        }, 100);
    } else {
        console.log('ERROR: Could not find required elements', {
            mainPage: !!mainPage,
            detailPage: !!detailPage,
            salesAssistantIconChat: !!salesAssistantIconChat
        });
    }
};

window.showDetailPageForStrategies = function() {
    console.log('showDetailPageForStrategies called - Strategies Icon chat thread');
    
    // Reset all chat containers to ensure clean state
    resetAllChatContainers();
    
    const mainPage = document.getElementById('mainHelpPage');
    const detailPage = document.getElementById('detailHelpPage');
    const strategiesIconChat = document.getElementById('strategiesIconChat');
    
    if (mainPage && detailPage) {
        mainPage.style.display = 'none';
        detailPage.style.display = 'block';
        
        // Hide all chat containers and show only Strategies Icon chat
        hideAllChatContainersExcept('strategiesIconChat');
        
        // Get recommendation data from config
        const strategiesRec = helpWidgetConfig?.recommendations?.find(rec => rec.id === 'rec2');
        if (!strategiesRec) {
            console.error('Sales Strategies recommendation not found in config');
            return;
        }
        
        // Generate links HTML
        const linksHTML = strategiesRec.links.map(link => 
            `<div class="link-item-static">
                <img src="sparkle.svg" alt="Sparkle" class="sparkle-icon">
                ${link.text}
            </div>`
        ).join('');
        
        // Clear previous chat and add strategies-specific content card
        strategiesIconChat.innerHTML = `
            <div class="recommendation-card">
                <h3>${strategiesRec.title}</h3>
                <p>${strategiesRec.description}</p>
                <div class="button-container">
                    <button class="btn-primary" onclick="window.open('${strategiesRec.buttonUrl}', '_blank'); return false;">${strategiesRec.buttonText}</button>
                </div>
                <div class="recommendation-links">
                    ${linksHTML}
                </div>
            </div>
            <div class="user-message-container grey-message-container">
                <div class="grey-message">
                    <p>Any questions about our upcoming sales strategies webinar I can help with?</p>
                </div>
            </div>
        `;
        
        console.log('Page navigation completed - Sales Strategies chat thread visible');
        
        // Initialize follow-up input functionality for strategies chat thread
        setTimeout(() => {
            handleFollowUpMessage('strategiesIconChat');
        }, 100);
    } else {
        console.log('ERROR: Could not find main page or detail page elements');
    }
};

window.showDetailPageForInnovations = function() {
    console.log('showDetailPageForInnovations called - Innovations Icon chat thread');
    
    // Reset all chat containers to ensure clean state
    resetAllChatContainers();
    
    const mainPage = document.getElementById('mainHelpPage');
    const detailPage = document.getElementById('detailHelpPage');
    const innovationsIconChat = document.getElementById('innovationsIconChat');
    
    if (mainPage && detailPage) {
        mainPage.style.display = 'none';
        detailPage.style.display = 'block';
        
        // Hide all chat containers and show only Innovations Icon chat
        hideAllChatContainersExcept('innovationsIconChat');
        
        // Get recommendation data from config
        const innovationsRec = helpWidgetConfig?.recommendations?.find(rec => rec.id === 'rec3');
        if (!innovationsRec) {
            console.error('Q2 Innovations recommendation not found in config');
            return;
        }
        
        // Generate links HTML
        const linksHTML = innovationsRec.links.map(link => 
            `<div class="link-item-static">
                <img src="sparkle.svg" alt="Sparkle" class="sparkle-icon">
                ${link.text}
            </div>`
        ).join('');
        
        // Clear previous chat and add innovations-specific content card
        innovationsIconChat.innerHTML = `
            <div class="recommendation-card">
                <h3>${innovationsRec.title}</h3>
                <p>${innovationsRec.description}</p>
                <div class="button-container">
                    <button class="btn-primary" onclick="window.open('${innovationsRec.buttonUrl}', '_blank'); return false;">${innovationsRec.buttonText}</button>
                </div>
                <div class="recommendation-links">
                    ${linksHTML}
                </div>
            </div>
            <div class="user-message-container grey-message-container">
                <div class="grey-message">
                    <p>Any questions about our Q2 innovations I can help with?</p>
                </div>
            </div>
        `;
        
        console.log('Page navigation completed - Q2 Innovations chat thread visible');
        
        // Initialize follow-up input functionality for innovations chat thread
        setTimeout(() => {
            handleFollowUpMessage('innovationsIconChat');
        }, 100);
    } else {
        console.log('ERROR: Could not find main page or detail page elements');
    }
};

window.showMainPage = function() {
    console.log('showMainPage called');
    
    // Reset all chat containers when returning to main page
    resetAllChatContainers();
    
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
                <p>How does Hiring Assistant work</p>
            </div>
        `;
        
        // Restore right alignment for blue user messages
        userMessageContainer.style.justifyContent = 'flex-end';
        userMessageContainer.style.setProperty('justify-content', 'flex-end', 'important');
        userMessageContainer.classList.remove('grey-message-container');
        
        console.log('Original user message restored');
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
                console.log('Checking if includes: "How does Hiring Assistant work"');
                
                if (linkText.includes('How does Hiring Assistant work')) {
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
let followUpHandlersAttached = false;
let currentChatThread = null;

function handleFollowUpMessage(chatThreadId) {
    console.log('handleFollowUpMessage called for thread:', chatThreadId);
    currentChatThread = chatThreadId;
    
    const followUpInput = document.querySelector('.follow-up-input');
    const sendButton = document.querySelector('.send-button');
    const chatContainer = document.getElementById(chatThreadId);
    
    console.log('Elements found:', {
        followUpInput: !!followUpInput,
        sendButton: !!sendButton,
        chatContainer: !!chatContainer,
        chatThreadId: chatThreadId
    });
    
    if (!followUpInput || !sendButton || !chatContainer) {
        console.log('Follow-up elements not found, resetting flag');
        followUpHandlersAttached = false;
        return;
    }
    
    // Prevent duplicate event listener attachment only if elements are found
    if (followUpHandlersAttached) {
        console.log('Follow-up handlers already attached, skipping');
        return;
    }
    
    console.log('Attaching event listeners to follow-up input');
    
    // Make generateAIResponse globally accessible for testing
    window.testAIResponse = async function() {
        console.log('Testing AI response...');
        await generateAIResponse("test message", chatContainer);
    };
    
    async function sendMessage() {
        console.log('sendMessage function called for thread:', currentChatThread);
        const message = followUpInput.value.trim();
        console.log('Message value:', message);
        if (!message) {
            console.log('Empty message, returning');
            return;
        }
        
        console.log('Sending message:', message);
        
        // Get the current active chat container
        const activeChatContainer = document.getElementById(currentChatThread);
        if (!activeChatContainer) {
            console.error('Active chat container not found:', currentChatThread);
            return;
        }
        
        // Create new user message element
        const newUserMessage = document.createElement('div');
        newUserMessage.className = 'user-message-container';
        newUserMessage.innerHTML = `
            <div class="user-message">
                <p>${message}</p>
            </div>
        `;
        
        // Add to the end of active chat container
        activeChatContainer.appendChild(newUserMessage);
        
        // Auto-scroll when new user message is added
        console.log('Calling scrollChatToBottom after adding user message');
        scrollChatToBottom();
        
        // Clear the input
        followUpInput.value = '';
        
        // Generate AI response after a short delay
        console.log('Setting timeout to generate AI response...');
        setTimeout(async () => {
            console.log('Timeout executed, calling generateAIResponse');
            try {
                await generateAIResponse(message, activeChatContainer);
            } catch (error) {
                console.error('Error generating AI response:', error);
            }
        }, 1000);
        
        console.log('New message sent:', message);
    }
    
    // Handle Enter key press
    followUpInput.addEventListener('keydown', function(e) {
        console.log('Key pressed:', e.key);
        if (e.key === 'Enter') {
            e.preventDefault();
            console.log('Enter key detected, sending message');
            sendMessage();
        }
    });
    
    // Handle send button click
    sendButton.addEventListener('click', function(e) {
        e.preventDefault();
        console.log('Send button clicked');
        console.log('About to call sendMessage from button click');
        sendMessage();
        console.log('sendMessage called from button click');
    });
    
    // Mark handlers as attached
    followUpHandlersAttached = true;
    console.log('Follow-up message handlers attached successfully');
}

// Enhanced Static Response System - No external APIs needed

// AI Response Generation with Typing Animation
async function generateAIResponse(userMessage, chatContainer) {
    console.log('generateAIResponse called with message:', userMessage);
    console.log('chatContainer element:', chatContainer);
    
    if (!chatContainer) {
        console.error('chatContainer is null or undefined');
        return;
    }
    
    // Generate intelligent response based on user input (now async)
    let response = await generateIntelligentResponse(userMessage);
    console.log('Generated response:', response);
    
    // Fallback if response is empty
    if (!response || response.trim() === '') {
        console.log('Empty response, using fallback');
        response = "I'd be happy to help you with that! Could you provide a bit more detail about what you're looking for with LinkedIn Recruiter?";
    }
    
    // Create unique IDs for this response
    const responseId = 'followup-response-' + Date.now();
    const thinkingId = responseId + '-thinking';
    const contentId = responseId + '-content';
    const feedbackId = responseId + '-feedback';
    
    // First, create and show AI thinking animation
    const aiThinkingContainer = document.createElement('div');
    aiThinkingContainer.className = 'ai-thinking-container';
    aiThinkingContainer.id = thinkingId;
    aiThinkingContainer.innerHTML = `
        <div class="ai-thinking">
            <div class="thinking-dots">
                <span class="thinking-dot"></span>
                <span class="thinking-dot"></span>
                <span class="thinking-dot"></span>
            </div>
        </div>
    `;
    
    // Add thinking animation to chat container
    chatContainer.appendChild(aiThinkingContainer);
    console.log('AI thinking animation added to chat');
    
    // Auto-scroll when thinking animation appears
    scrollChatToBottom();
    
    // After 2 seconds, hide thinking and show response with typing animation
    setTimeout(() => {
        // Remove thinking animation
        if (aiThinkingContainer.parentNode) {
            aiThinkingContainer.parentNode.removeChild(aiThinkingContainer);
        }
        
        // Create AI response container with typing animation structure
        const aiResponseContainer = document.createElement('div');
        aiResponseContainer.className = 'ai-response-container';
        aiResponseContainer.style.display = 'flex';
        aiResponseContainer.style.justifyContent = 'flex-start';
        
        aiResponseContainer.innerHTML = `
            <div class="ai-response-message" id="${responseId}">
                <div class="response-content" id="${contentId}">
                    <span class="typing-cursor"></span>
                </div>
                <div class="feedback-buttons" id="${feedbackId}" style="display: none;">
                    <button class="feedback-btn thumbs-up" title="Helpful">
                        <i class="fas fa-thumbs-up"></i>
                    </button>
                    <button class="feedback-btn thumbs-down" title="Not helpful">
                        <i class="fas fa-thumbs-down"></i>
                    </button>
                </div>
            </div>
        `;
        
        // Add to the end of chat container
        chatContainer.appendChild(aiResponseContainer);
        console.log('AI response container added to chat');
        
        // Auto-scroll when response container appears
        scrollChatToBottom();
        
        // Start typing animation after a short delay
        setTimeout(() => {
            startFollowUpTyping(response, contentId, feedbackId);
        }, 300);
        
    }, 2000); // Show thinking for 2 seconds
}

// Follow-up Response Typing Animation
function startFollowUpTyping(fullText, contentId, feedbackId) {
    console.log('Starting follow-up typing animation');
    const responseContent = document.getElementById(contentId);
    
    if (!responseContent) {
        console.error('Response content element not found:', contentId);
        return;
    }
    
    let currentIndex = 0;
    const typingSpeed = 25; // milliseconds per character
    
    // Start with empty content and cursor
    responseContent.innerHTML = '<span class="typing-cursor"></span>';
    
    function typeNextChar() {
        if (currentIndex < fullText.length) {
            const char = fullText[currentIndex];
            
            // Get current text without cursor
            const currentText = fullText.substring(0, currentIndex + 1);
            
            // Add cursor and update content
            responseContent.innerHTML = currentText + '<span class="typing-cursor"></span>';
            
            // Auto-scroll during typing to keep up with growing content
            if (currentIndex % 50 === 0) { // Scroll every 50 characters
                scrollChatToBottom();
            }
            
            currentIndex++;
            setTimeout(typeNextChar, typingSpeed);
        } else {
            // Animation complete - remove cursor and set final text
            responseContent.innerHTML = fullText;
            
            // Show feedback buttons after typing is complete
            const feedbackButtons = document.getElementById(feedbackId);
            if (feedbackButtons) {
                feedbackButtons.style.display = 'flex';
            }
            
            // Auto-scroll when typing is complete
            scrollChatToBottom();
            
            console.log('Follow-up typing animation completed');
        }
    }
    
    // Start typing
    setTimeout(typeNextChar, 100);
}



// Advanced AI Response Generator
async function generateIntelligentResponse(userMessage) {
    console.log('=== generateIntelligentResponse called with:', userMessage);
    const message = userMessage.toLowerCase();
    
    // Check if this matches any question in our JSON config as fallback
    const configResponse = findConfigResponse(userMessage);
    if (configResponse) {
        console.log('Using config response as fallback:', configResponse);
        return formatResponseText(configResponse);
    }
    
    // Use enhanced static response generation
    console.log('Using enhanced static response system');
    const questionType = analyzeQuestionType(message);
    const keywords = extractKeywords(message);
    
    console.log('Question type:', questionType);
    console.log('Keywords:', keywords);
    
    const response = generateContextualResponse(questionType, keywords, message);
    console.log('Final response from generateContextualResponse:', response);
    
    return response;
}

function findConfigResponse(question) {
    console.log('=== findConfigResponse DEBUG ===');
    console.log('Question received:', question);
    console.log('helpWidgetConfig exists:', !!helpWidgetConfig);
    console.log('helpWidgetConfig.responses exists:', !!helpWidgetConfig?.responses);
    
    if (!helpWidgetConfig?.responses) {
        console.log('No responses in config');
        return null;
    }
    
    console.log('Available response categories:', Object.keys(helpWidgetConfig.responses));
    
    // Search through all response categories
    for (const [category, responseData] of Object.entries(helpWidgetConfig.responses)) {
        console.log(`Checking category: ${category}`);
        console.log(`Response data:`, responseData);
        
        // Check if the question matches any keywords in the category
        const questionLower = question.toLowerCase();
        console.log(`Question lowercase: "${questionLower}"`);
        
        const categoryKeywords = {
            'salesAssistant': ['sales assistant', 'lead delivery', 'how does sales assistant work', 'assistant'],
            'salesAssistantLeads': ['where to see leads', 'find leads', 'leads from sales assistant', 'locate leads', 'view leads'],
            'strategies': ['strategy', 'webinar', 'speakers', 'sales strategies', 'training'],
            'webinarSpeakers': ['what tools will be featured', 'tools', 'featured tools', 'webinar tools'],
            'augustWebinars': ['august webinars', 'other webinars', 'more webinars', 'upcoming webinars'],
            'messageAssistReplies': ['message assist boost', 'reply rates', 'response rates', 'message assist replies'],
            'accountIQInsights': ['account iq insights', 'account iq provide', 'account intelligence', 'what insights'],
            'innovations': ['innovation', 'message assist', 'account iq', 'q2', 'features', 'new features']
        };
        
        // Check if question contains keywords for this category
        if (categoryKeywords[category]) {
            console.log(`Keywords for ${category}:`, categoryKeywords[category]);
            
            const isMatch = categoryKeywords[category].some(keyword => {
                const matches = questionLower.includes(keyword) || keyword.includes(questionLower);
                console.log(`  Testing keyword "${keyword}": ${matches}`);
                return matches;
            });
            
            console.log(`Category ${category} keyword match result: ${isMatch}`);
            
            if (isMatch) {
                console.log(`Found matching response in category ${category}:`, responseData);
                return responseData.answer;
            }
        }
        
        // Also check against the specific question in the response data
        if (responseData.question) {
            console.log(`Direct question check: "${responseData.question.toLowerCase()}" vs "${questionLower}"`);
            const directMatch = questionLower.includes(responseData.question.toLowerCase()) || 
                               responseData.question.toLowerCase().includes(questionLower);
            console.log(`Direct question match: ${directMatch}`);
            
            if (directMatch) {
                console.log(`Found direct question match in category ${category}:`, responseData);
                return responseData.answer;
            }
        }
    }
    
    console.log('No matching response found in config for question:', question);
    console.log('=== END findConfigResponse DEBUG ===');
    return null;
}

function formatResponseText(responseText) {
    if (!responseText) return '';
    
    // Convert markdown-style formatting to HTML
    let formatted = responseText
        // Convert bold text
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        // Convert bullet points
        .replace(/\n• /g, '<br>• ')
        // Convert paragraph breaks
        .replace(/\n\n/g, '</p><p>')
        // Convert line breaks
        .replace(/\n/g, '<br>');
    
    // Wrap in paragraph tags
    formatted = `<p>${formatted}</p>`;
    
    // Clean up any double paragraph tags
    formatted = formatted.replace(/<\/p><p><\/p><p>/g, '</p><p>');
    
    return formatted;
}

function analyzeQuestionType(message) {
    // Question type detection
    if (message.includes('how') && (message.includes('do') || message.includes('can'))) return 'how-to';
    if (message.includes('what') && (message.includes('is') || message.includes('are'))) return 'definition';
    if (message.includes('why') || message.includes('because')) return 'explanation';
    if (message.includes('when') || message.includes('time')) return 'timing';
    if (message.includes('where') || message.includes('find')) return 'location';
    if (message.includes('best') || message.includes('recommend')) return 'recommendation';
    if (message.includes('help') || message.includes('problem') || message.includes('issue')) return 'troubleshooting';
    if (message.includes('difference') || message.includes('vs') || message.includes('compare')) return 'comparison';
    
    return 'general';
}

function extractKeywords(message) {
    const salesNavKeywords = {
        'leads': ['lead', 'prospect', 'target', 'candidate', 'potential', 'qualified', 'unqualified', 'scoring'],
        'search': ['search', 'filter', 'find', 'discover', 'locate', 'query', 'boolean', 'advanced search', 'saved search'],
        'messaging': ['message', 'inmail', 'outreach', 'contact', 'reach out', 'communicate', 'email', 'follow up', 'response', 'reply'],
        'networking': ['connect', 'network', 'relationship', 'introduction', 'teamlink', 'mutual', 'warm', 'referral'],
        'accounts': ['account', 'company', 'organization', 'business', 'enterprise', 'corporation', 'firm'],
        'sales': ['sell', 'sales', 'deal', 'close', 'revenue', 'pipeline', 'quota', 'conversion', 'roi'],
        'data': ['analytics', 'metrics', 'performance', 'tracking', 'insights', 'reporting', 'dashboard', 'stats'],
        'features': ['premium', 'subscription', 'features', 'tools', 'functionality', 'capabilities'],
        'integration': ['crm', 'integrate', 'sync', 'export', 'import', 'salesforce', 'hubspot', 'dynamics'],
        'strategy': ['strategy', 'approach', 'plan', 'technique', 'method', 'best practice', 'tips', 'advice'],
        'sales assistant': ['sales assistant', 'ai', 'artificial intelligence', 'automation', 'smart'],
        'inmail': ['inmail', 'credits', 'premium messaging', 'direct message'],
        'teamlink': ['teamlink', 'team link', 'colleague', 'coworker', 'team member'],
        'boolean': ['boolean', 'and', 'or', 'not', 'operators', 'advanced query'],
        'personalization': ['personalize', 'customize', 'tailor', 'specific', 'individual'],
        'conversion': ['convert', 'conversion', 'success rate', 'effectiveness', 'results'],
        'troubleshooting': ['problem', 'issue', 'error', 'bug', 'not working', 'broken', 'fix'],
        'webinar': ['webinar', 'seminar', 'training', 'workshop', 'presentation', 'session']
    };
    
    let detectedCategories = [];
    for (let category in salesNavKeywords) {
        if (salesNavKeywords[category].some(keyword => message.includes(keyword))) {
            detectedCategories.push(category);
        }
    }
    
    return detectedCategories;
}

function generateContextualResponse(questionType, keywords, originalMessage) {
    // Generate responses based on question type and detected keywords
    
    if (questionType === 'how-to') {
        return generateHowToResponse(keywords, originalMessage);
    } else if (questionType === 'definition') {
        return generateDefinitionResponse(keywords, originalMessage);
    } else if (questionType === 'recommendation') {
        return generateRecommendationResponse(keywords, originalMessage);
    } else if (questionType === 'troubleshooting') {
        return generateTroubleshootingResponse(keywords, originalMessage);
    }
    
    // Default contextual response based on keywords
    return generateKeywordBasedResponse(keywords, originalMessage);
}

function generateHowToResponse(keywords, message) {
    // Lead-related responses with variation
    if (keywords.includes('leads')) {
        if (message.includes('find') || message.includes('get') || message.includes('discover')) {
            const responses = [
                "To find quality candidates in LinkedIn Recruiter, start with advanced search using specific filters like skills, experience, and location. Use boolean search operators for precision, save effective searches for ongoing sourcing, leverage mutual connections for warm introductions, and review AI-recommended candidates based on your hiring patterns.",
                "Finding the right candidates requires a strategic approach: **Advanced Filtering** - Use skills, experience, and location filters. **Boolean Search** - Combine keywords with AND, OR, NOT operators. **Saved Searches** - Set up alerts for new candidate matches. **Mutual Connections** - Identify warm introduction paths. **Hiring Assistant** - Review AI candidate suggestions based on your hiring history.",
                "Effective candidate sourcing in LinkedIn Recruiter involves multiple tactics. Start broad with industry and role filters, then narrow down using skills and experience parameters. Set up saved searches with notifications, use boolean keywords relevant to your target roles, and always check mutual connections for potential warm introductions through your network."
            ];
            return getRandomResponse(responses);
        }
        if (message.includes('qualify') || message.includes('score') || message.includes('prioritize')) {
            const responses = [
                "Candidate evaluation in LinkedIn Recruiter: **Recent Activity** - Check their posts and career engagement patterns. **Career Signals** - Look for growth indicators like skill development, achievements, or career progression. **Connection Quality** - Identify mutual connections or shared experiences. **Role Fit** - Verify their experience matches job requirements. **Timing Indicators** - Recent job changes or career announcements.",
                "Prioritize candidates by analyzing multiple factors: their recent LinkedIn activity shows career engagement level, skill development signals indicate growth potential, mutual connections provide warm introduction paths, and their experience level suggests role fit. Use LinkedIn Recruiter's candidate insights to rank prospects automatically.",
                "Evaluate candidates effectively by reviewing their profile completeness, recent career engagement, skills and endorsements, mutual connections for credibility, and their experience relevance to the role. Look for timing triggers like job changes, career milestones, or industry transitions."
            ];
            return getRandomResponse(responses);
        }
        if (message.includes('organize') || message.includes('manage') || message.includes('track')) {
            return "Organize your candidates using LinkedIn Recruiter's projects and talent pools. Create separate pipelines for different roles, hiring stages, or candidate types. Use notes to track interview history, set reminders for follow-ups, and leverage ATS integration to sync data across platforms. Regular pipeline maintenance ensures your recruiting stays focused and efficient.";
        }
    }
    
    // Messaging responses with variation
    if (keywords.includes('messaging') || keywords.includes('outreach') || keywords.includes('communication')) {
        if (message.includes('personalize') || message.includes('customize')) {
            const responses = [
                "Personalize messages by referencing specific details from their profile, recent posts, or company news. Mention mutual connections when relevant, lead with industry insights rather than sales pitches, and include a clear but low-pressure call-to-action. Keep initial messages under 300 characters for higher response rates.",
                "Effective personalization starts with research: **Profile Details** - Reference their experience or achievements. **Recent Activity** - Comment on their posts or shared content. **Company Context** - Mention industry trends affecting their business. **Mutual Connections** - Leverage shared network relationships. **Value First** - Lead with insights, not sales pitches.",
                "Craft compelling outreach by studying their background, engaging with their content first, finding common ground through shared connections or experiences, addressing industry-specific challenges they might face, and always leading with value or relevant insights rather than jumping straight into your pitch."
            ];
            return getRandomResponse(responses);
        }
        if (message.includes('template') || message.includes('format') || message.includes('structure')) {
            return "Structure effective messages with this framework: **Opening** - Personal connection or relevant insight (1-2 lines). **Value Proposition** - How you can help their specific situation (2-3 lines). **Soft CTA** - Low-pressure next step like 'Worth a brief conversation?' Keep total message under 300 characters and avoid sales-heavy language in the first touch.";
        }
        if (message.includes('follow up') || message.includes('followup')) {
            return "Follow-up strategy: **First Follow-up** - Add value with industry insights or relevant content (1 week later). **Second Follow-up** - Reference mutual connections or shared experiences (2 weeks later). **Third Follow-up** - Address potential objections or timing concerns (1 month later). Always provide value in each touchpoint rather than just checking in.";
        }
        return "Effective messaging combines personalization, value, and timing. Research your prospect's background, engage with their content, craft messages that address their specific challenges, and always lead with insights rather than sales pitches. Keep initial outreach concise and focused on building rapport.";
    }
    
    // Search-related responses
    if (keywords.includes('search') || keywords.includes('filter') || keywords.includes('query')) {
        const responses = [
            "Master LinkedIn Recruiter search with strategic filtering: Start broad with industry parameters, then narrow using geography, experience level, and skills. Use boolean operators (AND, OR, NOT) for keyword precision, save effective searches for automated updates, and combine multiple filter types for highly targeted candidate results.",
            "Advanced search techniques: **Boolean Logic** - Use AND, OR, NOT for precise targeting. **Keyword Strategy** - Include job titles, skills, and industry terms. **Filter Combinations** - Layer geography, industry, and experience filters. **Saved Searches** - Set up notifications for new candidate matches. **Regular Refinement** - Adjust based on candidate quality.",
            "Optimize your search approach by building queries systematically. Start with core industry filters, add geographic constraints, specify experience levels, use relevant keywords with boolean operators, save successful searches for ongoing monitoring, and regularly review and refine your criteria based on candidate quality."
        ];
        return getRandomResponse(responses);
    }
    
    // CRM and integration responses
    if (keywords.includes('crm') || keywords.includes('integration') || keywords.includes('sync')) {
        return "LinkedIn Recruiter integrates with major ATS platforms like Workday, Greenhouse, and Lever. Sync candidate data automatically, track hiring progress across platforms, maintain unified candidate records, and leverage LinkedIn Recruiter insights within your existing workflow. Set up the integration through your ATS app marketplace or LinkedIn Recruiter settings.";
    }
    
    // Account-based responses
    if (keywords.includes('account') || keywords.includes('company') || keywords.includes('organization')) {
        return "Company-based recruiting with LinkedIn Recruiter: Use company insights to understand growth and hiring needs, identify key talent across departments, track company activity and industry trends, build comprehensive talent maps within target organizations, and coordinate team-based recruiting strategies using shared projects and candidate pools.";
    }
    
    return "I can help you with specific LinkedIn Recruiter techniques. What particular aspect would you like to explore further - candidate sourcing, InMail strategies, search optimization, or talent pipeline management?";
}

// Helper function to return random responses for variety
function getRandomResponse(responses) {
    return responses[Math.floor(Math.random() * responses.length)];
}

function generateDefinitionResponse(keywords, message) {
    if (keywords.includes('leads')) {
        const responses = [
            "In Sales Navigator, leads are potential customers identified through targeted searches who match your ideal customer profile. Sales Navigator's AI recommends leads based on your saved searches, account preferences, and engagement patterns to help you find the most relevant prospects.",
            "Leads represent qualified prospects discovered through Sales Navigator's advanced search capabilities. They're individuals within your target market who show potential for your products or services, prioritized by relevance based on your activity and preferences.",
            "Sales Navigator leads are pre-qualified prospects generated through intelligent filtering and AI recommendations. These are potential customers who match your specified criteria for industry, role, company size, and other relevant factors that indicate sales opportunity."
        ];
        return getRandomResponse(responses);
    }
    
    if (keywords.includes('accounts')) {
        const responses = [
            "Accounts represent target companies or organizations in your sales territory. Sales Navigator provides comprehensive account insights including employee count, recent news, growth signals, decision-maker identification, and relationship mapping to help you understand and engage entire organizations.",
            "Sales Navigator accounts are companies you're actively targeting or monitoring. They offer detailed organizational insights, key personnel identification, company news and updates, growth indicators, and tools for coordinated team-based selling approaches.",
            "Accounts in Sales Navigator encompass your target organizations with rich company data, employee insights, recent developments, and strategic information. You can track account changes, set up alerts for important updates, and collaborate with team members on account strategies."
        ];
        return getRandomResponse(responses);
    }
    
    if (keywords.includes('inmail')) {
        return "InMail is Sales Navigator's premium messaging feature that allows you to contact LinkedIn members outside your network. Unlike regular LinkedIn messages, InMail reaches prospects directly regardless of connection status, with higher deliverability rates and read receipts for tracking engagement.";
    }
    
    if (keywords.includes('teamlink')) {
        return "TeamLink shows you warm introduction paths to prospects through your company colleagues' networks. It reveals which team members are connected to your targets, enabling leveraged introductions and higher response rates through trusted referrals.";
    }
    
    if (keywords.includes('sales assistant')) {
        return "Sales Assistant is Sales Navigator's AI-powered prospecting tool that automatically delivers pre-screened leads, identifies optimal connection paths, and drafts personalized outreach messages. It learns from your preferences and feedback to continuously improve lead recommendations.";
    }
    
    if (keywords.includes('features') && message.includes('premium')) {
        return "Sales Navigator Premium includes unlimited people searches, advanced lead and company search filters, InMail messaging credits, real-time sales updates, CRM integration, team collaboration tools, enhanced visibility into extended networks, and AI-powered lead recommendations.";
    }
    
    if (keywords.includes('boolean')) {
        return "Boolean search in Sales Navigator uses logical operators (AND, OR, NOT) to create precise search queries. This advanced technique helps you combine multiple keywords and criteria to find highly specific prospects that match complex requirements.";
    }
    
    if (keywords.includes('webinar')) {
        return "A webinar is an online seminar or educational presentation that participants can join remotely. In the context of Sales Navigator, LinkedIn regularly hosts webinars to teach sales professionals best practices, new feature updates, advanced prospecting techniques, and strategic sales methodologies. These training sessions help users maximize their Sales Navigator effectiveness and stay current with platform capabilities.";
    }
    
    const generalResponses = [
        "Sales Navigator is LinkedIn's advanced sales prospecting platform that helps sales professionals find, understand, and engage with prospects and accounts more effectively than standard LinkedIn.",
        "Sales Navigator provides sales teams with advanced tools for lead generation, account research, relationship mapping, and personalized outreach to accelerate the sales process.",
        "LinkedIn Sales Navigator is a premium prospecting solution offering enhanced search capabilities, detailed prospect insights, team collaboration features, and AI-powered recommendations for sales professionals."
    ];
    return getRandomResponse(generalResponses);
}

function generateRecommendationResponse(keywords, message) {
    if (keywords.includes('strategy') || keywords.includes('approach')) {
        const responses = [
            "For effective Sales Navigator strategy: **Define Your ICP** - Create detailed ideal customer profiles. **Targeted Searches** - Set up precise saved searches with relevant filters. **Content Engagement** - Interact with prospects' posts before outreach. **Warm Introductions** - Leverage TeamLink for referrals. **Performance Tracking** - Monitor and analyze your results consistently.",
            "Build a systematic Sales Navigator approach: Start with clear target market definition, create multiple saved searches for different prospect types, engage authentically with prospect content, use social selling techniques before direct outreach, and maintain consistent daily activity for compound results.",
            "Strategic Sales Navigator usage involves profile optimization, systematic prospect research, content-first engagement, relationship-based outreach, consistent follow-up sequences, performance measurement, and continuous refinement based on response rates and conversion metrics."
        ];
        return getRandomResponse(responses);
    }
    
    if (keywords.includes('messaging') || keywords.includes('outreach')) {
        const responses = [
            "Top messaging best practices: **Research First** - Study their profile and recent activity thoroughly. **Personalize Everything** - Reference specific details from their background or company. **Value-Led Opening** - Share industry insights or valuable resources. **Concise Format** - Keep initial messages under 300 characters. **Strategic Follow-up** - Continue providing value in subsequent touches.",
            "Effective outreach recommendations: Research each prospect individually, engage with their content before messaging, craft personalized messages with specific value propositions, use soft call-to-actions, leverage mutual connections when possible, and maintain consistent but valuable follow-up sequences.",
            "Optimize your messaging approach: Lead with relevant insights rather than sales pitches, reference mutual connections or shared experiences, address industry-specific challenges they might face, keep initial outreach conversational and brief, and always provide clear next steps or value in follow-ups."
        ];
        return getRandomResponse(responses);
    }
    
    if (keywords.includes('best practices') || keywords.includes('tips')) {
        return "Sales Navigator best practices: **Profile Optimization** - Professional, complete LinkedIn profile. **Systematic Prospecting** - Daily search and engagement routines. **Content Engagement** - Meaningful interactions before outreach. **Personalized Messaging** - Customized approaches for each prospect. **Performance Tracking** - Monitor metrics and refine strategies based on results.";
    }
    
    if (keywords.includes('results') || keywords.includes('performance')) {
        return "Improve your Sales Navigator results: Set clear daily activity goals, track response rates and conversion metrics, A/B test different message approaches, engage with prospect content before outreach, use TeamLink for warm introductions, maintain consistent follow-up schedules, and regularly review and refine your ideal customer profile.";
    }
    
    const generalRecommendations = [
        "For best results with Sales Navigator, focus on building genuine relationships, providing value in every interaction, and maintaining consistent prospecting activities. What specific area would you like recommendations for?",
        "Success with Sales Navigator requires a strategic approach: clear target definition, systematic prospecting, authentic engagement, personalized outreach, and consistent performance measurement. Which aspect interests you most?",
        "My recommendations center on relationship-first selling: thorough research, value-driven engagement, personalized communication, and long-term relationship development. What particular challenge can I help you address?"
    ];
    return getRandomResponse(generalRecommendations);
}

function generateTroubleshootingResponse(keywords, message) {
    if (message.includes('not working') || message.includes('error') || message.includes('broken')) {
        const responses = [
            "Common Sales Navigator issues and solutions: **Browser Issues** - Clear cache and cookies, try incognito mode. **Subscription** - Verify your account status and permissions. **Compatibility** - Use supported browsers (Chrome, Firefox, Safari). **Network** - Check internet connection stability. If problems persist, contact LinkedIn support with specific error details.",
            "Troubleshooting Sales Navigator problems: First, try refreshing the page and clearing your browser cache. Check if you're logged into the correct LinkedIn account with Sales Navigator access. Try using a different browser or incognito mode. For persistent issues, note the specific error message and contact LinkedIn support.",
            "Sales Navigator troubleshooting steps: **Quick Fixes** - Refresh page, clear cache, try incognito mode. **Account Check** - Verify subscription status and permissions. **Browser Test** - Try different browsers or disable extensions. **Network Test** - Check internet connection. **Support** - Contact LinkedIn with specific error details if issues continue."
        ];
        return getRandomResponse(responses);
    }
    
    if (message.includes('slow') || message.includes('loading') || message.includes('performance')) {
        const responses = [
            "To improve Sales Navigator performance: **Browser Optimization** - Close unnecessary tabs and disable unused extensions. **Clear Data** - Remove cache and browsing data. **Network Check** - Verify internet connection speed. **Search Scope** - Large searches with many filters can take longer to process.",
            "Speed up Sales Navigator: Close other browser tabs consuming memory, clear your cache and cookies, disable browser extensions temporarily, check your internet connection speed, and consider breaking large searches into smaller, more focused queries for faster results.",
            "Performance optimization tips: **Memory Management** - Close unused tabs and applications. **Browser Maintenance** - Clear cache regularly and update to latest version. **Search Strategy** - Use more specific filters to reduce result processing time. **Connection** - Ensure stable, high-speed internet access."
        ];
        return getRandomResponse(responses);
    }
    
    if (message.includes('search') && (message.includes('results') || message.includes('finding'))) {
        return "If you're not finding the right search results: **Broaden Filters** - Remove some restrictive criteria initially. **Keyword Strategy** - Try different job titles, skills, or industry terms. **Boolean Logic** - Use OR to expand, AND to narrow searches. **Geographic Settings** - Check location filters aren't too restrictive. **Save & Refine** - Save searches and adjust based on result quality.";
    }
    
    if (message.includes('message') && (message.includes('send') || message.includes('delivery'))) {
        return "Message delivery issues: **Connection Status** - Verify if you're connected to the recipient. **InMail Credits** - Check if you have available InMail credits for non-connections. **Message Limits** - Ensure you haven't exceeded daily messaging limits. **Account Status** - Confirm your Sales Navigator subscription is active. **Content Guidelines** - Review LinkedIn's messaging policies.";
    }
    
    if (message.includes('login') || message.includes('access') || message.includes('permission')) {
        return "Access issues troubleshooting: **Account Verification** - Ensure you're using the correct LinkedIn credentials. **Subscription Status** - Verify your Sales Navigator subscription is active and current. **Admin Permissions** - Check with your team admin if using a company account. **Browser Settings** - Clear cookies and try logging in with incognito mode.";
    }
    
    const generalTroubleshooting = [
        "I'm here to help troubleshoot your Sales Navigator challenges. Could you describe the specific issue you're encountering in more detail?",
        "For effective troubleshooting, please share more specifics about the problem: What were you trying to do? What happened instead? Any error messages? This helps me provide more targeted solutions.",
        "Let me help resolve your Sales Navigator issue. What specific feature or function isn't working as expected? The more details you provide, the better I can assist with a solution."
    ];
    return getRandomResponse(generalTroubleshooting);
}

function generateKeywordBasedResponse(keywords, message) {
    // Multi-keyword sophisticated responses
    if (keywords.includes('leads') && keywords.includes('search')) {
        return "Effective lead searching combines precise filtering with strategic keyword usage. Start with broad criteria, then layer specific filters like industry, location, and seniority. Use boolean search with relevant job titles and skills. Save successful searches to receive ongoing lead updates automatically.";
    }
    
    if (keywords.includes('messaging') && keywords.includes('networking')) {
        return "Combine messaging with networking by: 1) Connecting first when possible, 2) Engaging with their content before reaching out, 3) Leveraging mutual connections for warm introductions, 4) Sharing relevant industry insights, and 5) Building relationships gradually rather than rushing to sales conversations.";
    }
    
    if (keywords.includes('data') && keywords.includes('sales')) {
        return "Leverage Sales Navigator analytics by tracking: message response rates, connection acceptance rates, search result quality, lead conversion metrics, and account engagement levels. Use this data to refine your targeting, messaging, and overall sales approach for better results.";
    }
    
    // Single keyword responses with more context
    if (keywords.includes('leads')) {
        return "Lead generation in Sales Navigator works best with a systematic approach: define your ideal customer profile, use precise search filters, engage with prospects' content before outreach, and maintain consistent follow-up sequences. Quality over quantity always wins.";
    }
    
    if (keywords.includes('accounts')) {
        return "Account-based selling through Sales Navigator: research target companies thoroughly, identify multiple stakeholders, track company news and updates, coordinate team efforts, and build relationships across the organization rather than focusing on single contacts.";
    }
    
    // Default intelligent response
    return "I understand you're asking about " + (keywords.length > 0 ? keywords.join(' and ') : "Sales Navigator") + ". Could you provide more specific details about your situation or what you're trying to achieve? This will help me give you more targeted advice.";
}

// Onboarding Use Case Configuration
const onboardingHelpConfig = {
    greeting: { text: "Hi Alice, we are here to help you best onboard to Recruiter and set you up for success." },
    type: "checklist", // Different type to generate checklist instead of recommendations
    checklist: {
        title: "Onboarding checklist",
        subtitle: "Top actions for the first 7 days",
        totalItems: 5,
        completedItems: 0,
        items: [
            {
                id: "item1",
                title: "Item 1 title",
                subtitle: "Item 1 subtitle",
                completed: false
            },
            {
                id: "item2", 
                title: "Item 2 title",
                subtitle: "Item 2 subtitle",
                completed: false
            },
            {
                id: "item3",
                title: "Item 3 title", 
                subtitle: "Item 3 subtitle",
                completed: false
            },
            {
                id: "item4",
                title: "Item 4 title",
                subtitle: "Item 4 subtitle", 
                completed: false
            },
            {
                id: "item5",
                title: "Item 5 title",
                subtitle: "Item 5 subtitle",
                completed: false
            }
        ]
    },
    responses: {}
};

// Function to get current active use case
function getActiveUseCase() {
    const onboardingPill = document.getElementById('onboarding-pill');
    const growthPill = document.getElementById('growth-pill');
    
    if (onboardingPill && onboardingPill.classList.contains('active')) {
        return 'onboarding';
    } else if (growthPill && growthPill.classList.contains('active')) {
        return 'growth';
    }
    return 'growth'; // Default to growth if none active
}

// Function to load appropriate help configuration
function getHelpConfiguration() {
    const activeUseCase = getActiveUseCase();
    console.log('Active use case:', activeUseCase);
    
    if (activeUseCase === 'onboarding') {
        console.log('Returning onboarding config');
        return onboardingHelpConfig;
    } else {
        console.log('Returning growth config (default)');
        return getDefaultHelpConfig(); // Always use default for growth
    }
}

function getDefaultHelpConfig() {
    return {
        greeting: { text: "Hi Alice, you sent 15 InMails last week. Here are 2 recommendations to boost productivity" },
        recommendations: [
            {
                "id": "rec1",
                "title": "Streamline Your Hiring Process",
                "description": "Connect with top talent more efficiently using<br>the AI-powered <span class=\"sales-assistant\">LinkedIn Hiring Assistant</span> for smarter recruiting.",
                "buttonText": "Try Hiring Assistant",
                "buttonAction": "",
                "buttonUrl": "",
                "links": [
                    {
                        "text": "How does Hiring Assistant work",
                        "action": "showDetailPage"
                    },
                    {
                        "text": "How to post a job with Hiring Assistant",
                        "action": "viewLeads"
                    }
                ],
                "expanded": true,
                "chatFunction": "showDetailPageForSalesAssistant"
            },
            {
                "id": "rec2", 
                "title": "Discover New Sales Strategies",
                "description": "Stay ahead and sign up for the Top 5 Sales Strategies webinar coming up on July 25 10AM. Learn advanced lead generation and smarter prospecting from industry experts.",
                "buttonText": "Reserve a spot",
                "buttonAction": "reserveSpot",
                "buttonUrl": "https://training.sales.linkedin.com/live-introduction-to-sales-navigator",
                "links": [
                    {
                        "text": "What tools will be featured",
                        "action": "viewSpeakers"
                    },
                    {
                        "text": "Any other webinars in August",
                        "action": "viewWebinars"
                    }
                ],
                "expanded": false,
                "chatFunction": "showDetailPageForStrategies"
            }
        ]
    };
}

// Badge management functions
function showBadge() {
    const badge = document.querySelector('.notification-badge');
    if (badge) {
        badge.style.display = 'flex';
    }
}

function showBadgeWithDelay() {
    setTimeout(() => {
        showBadge();
    }, 500); // 0.5 second delay
}

function hideBadge() {
    const badge = document.querySelector('.notification-badge');
    if (badge) {
        badge.style.display = 'none';
    }
}

// Control Panel Toggle Functionality
function toggleControlPill(pillType) {
    const onboardingPill = document.getElementById('onboarding-pill');
    const growthPill = document.getElementById('growth-pill');
    
    if (pillType === 'onboarding') {
        // Activate onboarding pill only if it's not already active
        if (!onboardingPill.classList.contains('active')) {
            onboardingPill.classList.add('active');
            growthPill.classList.remove('active');
            // Show badge with delay when switching to different use case
            showBadgeWithDelay();
        }
    } else if (pillType === 'growth') {
        // Activate growth pill only if it's not already active
        if (!growthPill.classList.contains('active')) {
            growthPill.classList.add('active');
            onboardingPill.classList.remove('active');
            // Show badge with delay when switching to different use case
            showBadgeWithDelay();
        }
    }
    
    // Regenerate help content if help panel is open
    if (isHelpPanelOpen) {
        console.log('Regenerating help content due to use case change');
        generateHelpContent();
    }
    
    // Also force regeneration for testing - remove this line if not needed
    console.log('Force regenerating help content for testing');
    generateHelpContent();
    
    // Add console log to see current state
    console.log('Onboarding active:', onboardingPill.classList.contains('active'));
    console.log('Growth active:', growthPill.classList.contains('active'));
}

// Add entrance animations
window.addEventListener('load', async () => {
    try {
        // Load configuration first
        await loadConfiguration();
        
        // Wait a bit for DOM to be ready
        setTimeout(() => {
            // Generate help content from config
            generateHelpContent();
        }, 100);
        
        // Show badge with delay after page load
        showBadgeWithDelay();
        
    } catch (error) {
        console.error('Error during page initialization:', error);
        // Fallback: set greeting manually if config fails
        const greetingElement = document.querySelector('.help-greeting p');
        if (greetingElement) {
            greetingElement.textContent = "HELLO!! Sam, you saved 15 leads last week. Here are 3 recommendations to boost productivity";
        }
    }
    
    // Add click handler to question mark icon in top nav
    const questionMarkIcon = document.querySelector('.nav-icon-with-badge');
    if (questionMarkIcon) {
        questionMarkIcon.addEventListener('click', openHelpPanel);
        questionMarkIcon.style.cursor = 'pointer';
    }
    
    // Initialize follow-up input functionality
    handleFollowUpMessage();
    
    // Add styles for follow-up AI response (grey style)
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
            
            .ai-response-message .response-content {
                margin: 0;
                font-family: 'SF Pro Text', -apple-system, BlinkMacSystemFont, sans-serif;
                font-size: 14px;
                font-weight: 400;
                line-height: 1.25;
                color: rgba(0, 0, 0, 0.9);
            }
            
            .ai-response-message .feedback-buttons {
                display: flex;
                gap: 8px;
                margin-top: 12px;
                justify-content: flex-end;
            }
            
            .ai-response-message .feedback-btn {
                background: none;
                border: 1px solid rgba(0, 0, 0, 0.15);
                border-radius: 20px;
                padding: 6px 12px;
                cursor: pointer;
                transition: all 0.2s ease;
                color: rgba(0, 0, 0, 0.6);
                font-size: 14px;
            }
            
                         .ai-response-message .feedback-btn:hover {
                 background: rgba(0, 0, 0, 0.05);
                 border-color: rgba(0, 0, 0, 0.25);
             }
             
             .grey-message {
                 background: #F5F5F5;
                 border-radius: 16px;
                 padding: 18px 16px;
                 width: fit-content;
                 max-width: calc(100% - 16px);
                 margin: 0 16px 0 0;
                 word-wrap: break-word;
                 overflow-wrap: break-word;
                 font-family: 'SF Pro Text', -apple-system, BlinkMacSystemFont, sans-serif;
                 font-size: 14px;
                 font-weight: 400;
                 line-height: 1.25;
                 color: rgba(0, 0, 0, 0.9);
             }
             
             .grey-message p {
                 margin: 0;
                 font-family: 'SF Pro Text', -apple-system, BlinkMacSystemFont, sans-serif;
                 font-size: 14px;
                 font-weight: 400;
                 line-height: 1.25;
                 color: rgba(0, 0, 0, 0.9);
             }
             
             .grey-message-container {
                 display: flex !important;
                 justify-content: flex-start !important;
             }
             
             .user-message-container {
                 margin-top: 16px;
             }
             
             .user-message-container:first-child {
                 margin-top: 0;
             }
             

         `;
         document.head.appendChild(style);
    }
    

}); 