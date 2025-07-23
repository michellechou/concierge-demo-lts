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
            greeting: { text: "HELLO!! Sam, you saved 15 leads last week. Here are 3 recommendations to boost productivity" },
            recommendations: [
                {
                    "id": "rec1",
                    "title": "Save time with Sales Assistant",
                    "description": "Automate lead delivery, identify best paths to connect, and draft personalized outreach with the newly introduced <span class=\"sales-assistant\">Sales Assistant</span>.",
                    "buttonText": "Try Sales Assistant",
                    "buttonAction": "trySalesAssistant",
                    "links": [
                        {
                            "text": "How does Sales Assistant work",
                            "action": "showDetailPage"
                        },
                        {
                            "text": "Where to see leads from Sales Assistant",
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
                },
                {
                    "id": "rec3",
                    "title": "Unlock Q2 Innovations", 
                    "description": "Discover latest features to enhance sales workflow. Save time with Message Assist to draft outreach and gain deeper insights with Account IQ for smarter, strategic decisions.",
                    "buttonText": "Explore Q2 updates",
                    "buttonAction": "exploreUpdates",
                    "links": [
                        {
                            "text": "Does Message Assist boost replies",
                            "action": "messageAssistInfo"
                        },
                        {
                            "text": "What insights does Account IQ provide",
                            "action": "accountIQInfo"
                        }
                    ],
                    "expanded": false,
                    "chatFunction": "showDetailPageForInnovations"
                }
            ],
            resources: { title: "Resources", links: [] },
            responses: {
                "salesAssistant": {
                    "question": "How does Sales Assistant work",
                    "answer": "Sales Navigator's AI-powered Sales Assistant is a tool designed to enhance the efficiency of prospecting by delivering pre-screened leads, identifying optimal paths to connect with prospects, and drafting personalized outreach messages. To maximize the effectiveness of Sales Assistant, here's how it works and some tips to optimize its key features:\n\n· **Lead Recommendation and Feedback:**\n· Sales Assistant provides recommendations for leads based on your preferences, including your selected book of business, products, and personas.\n· Reviewing leads and providing feedback (e.g., marking a lead as \"Not a fit\" with specific reasons such as incorrect geography, seniority, or industry) helps Sales Assistant refine future recommendations to align with your needs.\n\n· **Personalized Messaging Assistance:**\n· Using Message Assist, Sales Assistant drafts personalized first-touch messages by leveraging account insights, lead data, and customization based on your product details and messaging preferences.\n· You can refine these drafts, and Sales Assistant learns from your edits to improve future message drafts automatically.\n\n· **Product and Service Personalization:**\n· You can specify the product or service you're selling, ensuring that generated messages and lead recommendations are tailored to showcase how your offering solves a lead's needs.\n· Adding detailed product descriptions enhances personalization and improves how prospects are targeted.\n\n· **Book of Business:**\n· Designating an \"account list\" in your book of business helps target relevant accounts. Lists should include at least five accounts to be actively used by Sales Assistant.\n· To populate your book of business, you can use auto-saved CRM accounts, upload a CSV file, or manually create an account list."
                },
                "salesAssistantLeads": {
                    "question": "Where to see leads from Sales Assistant",
                    "answer": "To see leads from Sales Assistant in Sales Navigator, follow these steps:\\n\\n1. **Navigate to the Prospecting Tab:**\\n· Click on the \\\"Prospecting\\\" option in the top menu.\\n\\n2. **Review the Recommended Leads:**\\n· In the \\\"Prospecting\\\" tab, the left pane will display leads recommended by Sales Assistant.\\n· Each recommended lead includes details on why it was selected, such as alignment with your lead preferences, account list, or personas. This helps you understand the recommendation's relevance.\\n\\n3. **Interact with Leads:**\\n· Select a specific lead from the left pane to view its details.\\n· To confirm if the lead recommendation is suitable for you:\\n  · Click \\\"Good fit\\\" to approve the lead. Approved leads are saved automatically to your \\\"Leads from Sales Assistant\\\" list for future tracking.\\n  · Click \\\"Not a fit\\\" to reject the lead. You will be prompted to provide feedback on why the lead does not meet your needs, which allows the Sales Assistant to refine future recommendations.\\n\\n4. **First-Touch Messaging:**\\n· If you mark a lead as a \\\"Good fit,\\\" Sales Assistant will automatically draft a personalized first-touch message. You can:\\n  · Edit the draft before sending.\\n  · Copy the message to send through another medium (e.g., email).\\n  · Save it for later use.\\n\\n5. **Generate More Leads:**\\n· If you want to explore additional leads beyond the initial batch:\\n  · Click \\\"Generate leads\\\" in the left pane. This action provides new recommendations; however, you must review the existing batch before accessing more leads.\\n  · Keep in mind that there is a daily limit for generating new lead suggestions.\\n\\nBy following these steps, you can efficiently access and manage the leads recommended by Sales Assistant to optimize your prospecting process."
                },
                "webinarSpeakers": {
                    "question": "What tools will be featured",
                    "answer": "The Top 5 Sales Strategies webinar will cover the following Sales Navigator tools, designed to enhance lead generation and prospecting.\\n\\n· **Advanced search filters:** Quickly find the right leads with detailed search capabilities, with the ability to customize search preferences to match your needs.\\n\\n· **Recommended leads:** Get automated lead recommendations based on your activity and buyer intent signals.\\n\\n· **Lead IQ:** Access an AI-generated summary of key information on a lead and their company to improve initial interactions.\\n\\nRegister for the webinar to learn how industry experts are using these tools for smarter prospecting."
                },
                "augustWebinars": {
                    "question": "Any other webinars in August",
                    "answer": "**August 2024 Sales Navigator Webinar Series**\n\n**📅 August 8, 2:00 PM PST**\n**\"Account-Based Selling Mastery\"**\n• Focus on enterprise sales strategies\n• Multi-stakeholder engagement techniques\n• Account mapping and relationship building\n\n**📅 August 15, 11:00 AM PST**\n**\"Social Selling Success Stories\"**\n• Real customer case studies and results\n• ROI measurement and success metrics\n• Best practices from top performers\n\n**📅 August 22, 1:00 PM PST**\n**\"AI-Powered Prospecting Workshop\"**\n• Hands-on training with Sales Assistant\n• Message Assist optimization techniques\n• Advanced search and filtering strategies\n\n**🎁 Exclusive Benefits:**\n• All attendees receive 30-day Premium trial extension\n• Access to exclusive webinar resource library\n• Priority beta access to new features"
                },
                "messageAssistReplies": {
                    "question": "Does Message Assist boost replies",
                    "answer": "**Message Assist Reply Rate Performance**\n\n**📊 Proven Results:**\n• **73% higher response rates** compared to generic outreach\n• **2.3x more meeting bookings** from initial messages\n• **45% reduction in time** spent drafting personalized messages\n• **85% user satisfaction** rating from Sales Navigator Premium users\n\n**🎯 Why It Works:**\n• **Contextual Personalization** - Uses recent prospect activity and news\n• **Industry-Specific Language** - Adapts tone and terminology by sector\n• **Optimal Timing Suggestions** - Recommends best send times\n• **A/B Testing Built-In** - Learns from your response patterns\n\n**📈 Performance by Message Type:**\n• **Connection Requests:** 68% acceptance rate (vs 23% generic)\n• **Follow-Up Messages:** 41% response rate (vs 18% generic)\n• **Cold Outreach:** 29% response rate (vs 12% generic)\n\n**⚡ Quick Setup:** Available in all Premium+ plans, activate in Settings → Message Assist"
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
    if (!helpWidgetConfig) {
        console.error('Configuration not loaded yet');
        return;
    }
    
    console.log('Generating help content from configuration...', helpWidgetConfig);
    
    // Update greeting
    const greetingElement = document.querySelector('.help-greeting p');
    console.log('Found greeting element:', !!greetingElement);
    console.log('Current greeting element text:', greetingElement?.textContent);
    console.log('About to set greeting to:', helpWidgetConfig.greeting?.text);
    
    if (greetingElement && helpWidgetConfig.greeting) {
        console.log('Updating greeting with:', helpWidgetConfig.greeting.text);
        greetingElement.textContent = helpWidgetConfig.greeting.text;
        console.log('After update, greeting element text:', greetingElement.textContent);
    } else {
        console.error('Greeting element not found or greeting data missing', {
            greetingElement: !!greetingElement,
            greetingData: !!helpWidgetConfig.greeting
        });
    }
    
    // Generate recommendation cards
    generateRecommendationCards();
    
    // Generate resource links
    generateResourceLinks();
    
    console.log('Help content generated successfully');
}

function generateRecommendationCards() {
    console.log('generateRecommendationCards called');
    const recommendationsContainer = document.querySelector('.recommendations');
    console.log('recommendationsContainer found:', !!recommendationsContainer);
    console.log('helpWidgetConfig.recommendations:', helpWidgetConfig?.recommendations);
    
    if (!recommendationsContainer || !helpWidgetConfig.recommendations) {
        console.error('Recommendations container not found or no recommendations data', {
            container: !!recommendationsContainer,
            recommendations: !!helpWidgetConfig?.recommendations,
            recommendationsLength: helpWidgetConfig?.recommendations?.length
        });
        return;
    }
    
    // Clear existing content
    recommendationsContainer.innerHTML = '';
    
    // Generate each recommendation card
    helpWidgetConfig.recommendations.forEach((rec, index) => {
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
                clickAction = 'showDetailPageForLeads(); return false;';
            } else if (link.text === 'What tools will be featured') {
                clickAction = 'showDetailPageForSpeakers(); return false;';
            } else if (link.text === 'Any other webinars in August') {
                clickAction = 'showDetailPageForAugustWebinars(); return false;';
            } else if (link.text === 'Does Message Assist boost replies') {
                clickAction = 'showDetailPageForMessageAssist(); return false;';
            } else if (link.text === 'What insights does Account IQ provide') {
                clickAction = 'showDetailPageForAccountIQ(); return false;';
            }
            
            return `<a href="#" class="link-item" onclick="${clickAction}">
                <div class="diamond-icon"></div>
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
                        <button class="btn-primary">${rec.buttonText}</button>
                        <div class="chat-icon" onclick="${rec.chatFunction}(); return false;">
                            <i class="fas fa-comment-dots"></i>
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
            transition: all 0.6s ease;
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
            transition: all 0.6s ease;
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
    
    // Auto-expand after 2 seconds
    setTimeout(() => {
        floatingButton.classList.add('auto-expanded');
    }, 2000);
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
    const mainPage = document.getElementById('mainHelpPage');
    const detailPage = document.getElementById('detailHelpPage');
    const salesAssistantChat = document.getElementById('salesAssistantChat');
    const generalChat = document.getElementById('generalChat');
    
    console.log('Main page element:', mainPage);
    console.log('Detail page element:', detailPage);
    
    if (mainPage && detailPage) {
        mainPage.style.display = 'none';
        detailPage.style.display = 'block';
        
        // Show Sales Assistant chat thread, hide general chat
        if (salesAssistantChat) salesAssistantChat.style.display = 'block';
        if (generalChat) generalChat.style.display = 'none';
        
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

window.showDetailPageWithGreyMessage = function() {
    console.log('showDetailPageWithGreyMessage called - General chat thread');
    const mainPage = document.getElementById('mainHelpPage');
    const detailPage = document.getElementById('detailHelpPage');
    const salesAssistantChat = document.getElementById('salesAssistantChat');
    const generalChat = document.getElementById('generalChat');
    
    if (mainPage && detailPage) {
        mainPage.style.display = 'none';
        detailPage.style.display = 'block';
        
        // Show general chat thread, hide Sales Assistant chat
        if (salesAssistantChat) salesAssistantChat.style.display = 'none';
        if (generalChat) generalChat.style.display = 'block';
        
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
                    <div class="diamond-icon"></div>
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
window.showDetailPageForLeads = function() {
    showDetailPageWithQuestion('Where to see leads from Sales Assistant', 'Sales Assistant Leads', 'rec1');
};

window.showDetailPageForSpeakers = function() {
    showDetailPageWithQuestion('What tools will be featured', 'Webinar Tools', 'rec2');
};

window.showDetailPageForAugustWebinars = function() {
    showDetailPageWithQuestion('Any other webinars in August', 'August Webinars', 'rec2');
};

window.showDetailPageForMessageAssist = function() {
    showDetailPageWithQuestion('Does Message Assist boost replies', 'Message Assist Replies', 'rec3');
};

window.showDetailPageForAccountIQ = function() {
    showDetailPageWithQuestion('What insights does Account IQ provide', 'Account IQ Insights', 'rec3');
};



window.showDetailPageForSalesAssistant = function() {
    console.log('showDetailPageForSalesAssistant called - Sales Assistant chat thread');
    const mainPage = document.getElementById('mainHelpPage');
    const detailPage = document.getElementById('detailHelpPage');
    const salesAssistantChat = document.getElementById('salesAssistantChat');
    const generalChat = document.getElementById('generalChat');
    
    if (mainPage && detailPage) {
        mainPage.style.display = 'none';
        detailPage.style.display = 'block';
        
        // Show general chat thread for Sales Assistant, hide Sales Assistant chat
        if (salesAssistantChat) salesAssistantChat.style.display = 'none';
        if (generalChat) generalChat.style.display = 'block';
        
        // Clear previous chat and add Sales Assistant-specific content card
        generalChat.innerHTML = `
            <div class="recommendation-card">
                <h3>Save time with Sales Assistant</h3>
                <p>Automate lead delivery, identify best paths to connect, and draft personalized outreach with the newly introduced <span class="sales-assistant">Sales Assistant</span>.</p>
                <div class="button-container">
                    <button class="btn-primary">Try Sales Assistant</button>
                </div>
                <div class="recommendation-links">
                    <div class="link-item-static">
                        <div class="diamond-icon"></div>
                        How does Sales Assistant work
                    </div>
                    <div class="link-item-static">
                        <div class="diamond-icon"></div>
                        Where to see leads from Sales Assistant
                    </div>
                </div>
            </div>
            <div class="user-message-container grey-message-container">
                <div class="grey-message">
                    <p>Any follow-up questions about Sales Assistant I can help with?</p>
                </div>
            </div>
        `;
        
        console.log('Page navigation completed - Sales Assistant chat thread visible');
        
        // Initialize follow-up input functionality for Sales Assistant chat thread
        setTimeout(() => {
            handleFollowUpMessage('generalChat');
        }, 100);
    } else {
        console.log('ERROR: Could not find main page or detail page elements');
    }
};

window.showDetailPageForStrategies = function() {
    console.log('showDetailPageForStrategies called - Sales Strategies chat thread');
    const mainPage = document.getElementById('mainHelpPage');
    const detailPage = document.getElementById('detailHelpPage');
    const salesAssistantChat = document.getElementById('salesAssistantChat');
    const generalChat = document.getElementById('generalChat');
    
    if (mainPage && detailPage) {
        mainPage.style.display = 'none';
        detailPage.style.display = 'block';
        
        // Show general chat thread for strategies, hide Sales Assistant chat
        if (salesAssistantChat) salesAssistantChat.style.display = 'none';
        if (generalChat) generalChat.style.display = 'block';
        
        // Get recommendation data from config
        const strategiesRec = helpWidgetConfig?.recommendations?.find(rec => rec.id === 'rec2');
        if (!strategiesRec) {
            console.error('Sales Strategies recommendation not found in config');
            return;
        }
        
        // Generate links HTML
        const linksHTML = strategiesRec.links.map(link => 
            `<div class="link-item-static">
                <div class="diamond-icon"></div>
                ${link.text}
            </div>`
        ).join('');
        
        // Clear previous chat and add strategies-specific content card
        generalChat.innerHTML = `
            <div class="recommendation-card">
                <h3>${strategiesRec.title}</h3>
                <p>${strategiesRec.description}</p>
                <div class="button-container">
                    <button class="btn-primary">${strategiesRec.buttonText}</button>
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
            handleFollowUpMessage('generalChat');
        }, 100);
    } else {
        console.log('ERROR: Could not find main page or detail page elements');
    }
};

window.showDetailPageForInnovations = function() {
    console.log('showDetailPageForInnovations called - Q2 Innovations chat thread');
    const mainPage = document.getElementById('mainHelpPage');
    const detailPage = document.getElementById('detailHelpPage');
    const salesAssistantChat = document.getElementById('salesAssistantChat');
    const generalChat = document.getElementById('generalChat');
    
    if (mainPage && detailPage) {
        mainPage.style.display = 'none';
        detailPage.style.display = 'block';
        
        // Show general chat thread for innovations, hide Sales Assistant chat
        if (salesAssistantChat) salesAssistantChat.style.display = 'none';
        if (generalChat) generalChat.style.display = 'block';
        
        // Get recommendation data from config
        const innovationsRec = helpWidgetConfig?.recommendations?.find(rec => rec.id === 'rec3');
        if (!innovationsRec) {
            console.error('Q2 Innovations recommendation not found in config');
            return;
        }
        
        // Generate links HTML
        const linksHTML = innovationsRec.links.map(link => 
            `<div class="link-item-static">
                <div class="diamond-icon"></div>
                ${link.text}
            </div>`
        ).join('');
        
        // Clear previous chat and add innovations-specific content card
        generalChat.innerHTML = `
            <div class="recommendation-card">
                <h3>${innovationsRec.title}</h3>
                <p>${innovationsRec.description}</p>
                <div class="button-container">
                    <button class="btn-primary">${innovationsRec.buttonText}</button>
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
            handleFollowUpMessage('generalChat');
        }, 100);
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
    window.testAIResponse = function() {
        console.log('Testing AI response...');
        generateAIResponse("test message", chatContainer);
    };
    
    function sendMessage() {
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
        setTimeout(() => {
            console.log('Timeout executed, calling generateAIResponse');
            try {
                generateAIResponse(message, activeChatContainer);
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

// AI Response Generation with Typing Animation
function generateAIResponse(userMessage, chatContainer) {
    console.log('generateAIResponse called with message:', userMessage);
    console.log('chatContainer element:', chatContainer);
    
    if (!chatContainer) {
        console.error('chatContainer is null or undefined');
        return;
    }
    
    // Generate intelligent response based on user input
    let response = generateIntelligentResponse(userMessage);
    console.log('Generated response:', response);
    
    // Fallback if response is empty
    if (!response || response.trim() === '') {
        console.log('Empty response, using fallback');
        response = "I'd be happy to help you with that! Could you provide a bit more detail about what you're looking for with Sales Navigator?";
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
function generateIntelligentResponse(userMessage) {
    console.log('generateIntelligentResponse called with:', userMessage);
    const message = userMessage.toLowerCase();
    
    // First, check if this matches any question in our JSON config
    const configResponse = findConfigResponse(userMessage);
    if (configResponse) {
        console.log('Found response in config:', configResponse);
        return formatResponseText(configResponse);
    }
    
    // If no config response found, use intelligent generation
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
        'leads': ['lead', 'prospect', 'target', 'candidate'],
        'search': ['search', 'filter', 'find', 'discover', 'locate'],
        'messaging': ['message', 'inmail', 'outreach', 'contact', 'reach out', 'communicate'],
        'networking': ['connect', 'network', 'relationship', 'introduction'],
        'accounts': ['account', 'company', 'organization', 'business'],
        'sales': ['sell', 'sales', 'deal', 'close', 'revenue', 'pipeline'],
        'data': ['analytics', 'metrics', 'performance', 'tracking', 'insights'],
        'features': ['premium', 'subscription', 'features', 'tools'],
        'integration': ['crm', 'integrate', 'sync', 'export'],
        'strategy': ['strategy', 'approach', 'plan', 'technique', 'method']
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
    if (keywords.includes('leads')) {
        if (message.includes('find') || message.includes('get')) {
            return "To find quality leads in Sales Navigator: 1) Use Lead Builder with specific filters (industry, location, seniority), 2) Apply boolean search with relevant keywords, 3) Leverage saved searches for ongoing lead discovery, 4) Use TeamLink to see warm connections, and 5) Review lead recommendations based on your past activity and saved accounts.";
        }
        if (message.includes('qualify') || message.includes('score')) {
            return "Qualify leads effectively by: 1) Reviewing their recent activity and posts, 2) Checking their company's growth signals, 3) Looking for mutual connections or shared experiences, 4) Analyzing their role and decision-making authority, and 5) Using Sales Navigator's lead scoring indicators to prioritize outreach.";
        }
    }
    
    if (keywords.includes('messaging')) {
        return "Craft effective messages by: 1) Personalizing with specific details from their profile, 2) Mentioning mutual connections when relevant, 3) Leading with value or insights rather than a sales pitch, 4) Keeping initial messages concise (under 300 characters), and 5) Including a clear, low-pressure call-to-action.";
    }
    
    if (keywords.includes('search')) {
        return "Master Sales Navigator search by: 1) Starting broad then narrowing with filters, 2) Using boolean operators (AND, OR, NOT) for precision, 3) Saving effective searches for regular updates, 4) Combining multiple filter types (geography + industry + seniority), and 5) Regularly refining based on results quality.";
    }
    
    return "I can help you with specific Sales Navigator techniques. Could you provide more details about what you're trying to accomplish?";
}

function generateDefinitionResponse(keywords, message) {
    if (keywords.includes('leads')) {
        return "In Sales Navigator, leads are potential customers or prospects identified through targeted searches. They're individuals who match your ideal customer profile and represent potential sales opportunities. Sales Navigator uses AI to recommend leads based on your saved searches, account preferences, and engagement history.";
    }
    
    if (keywords.includes('accounts')) {
        return "Accounts in Sales Navigator represent companies or organizations you're targeting. They provide comprehensive company insights including employee count, recent news, growth signals, and decision-maker identification. You can save accounts to track changes and receive alerts about important updates.";
    }
    
    if (keywords.includes('features') && message.includes('premium')) {
        return "Sales Navigator Premium includes: unlimited people searches, advanced lead and company search filters, InMail messaging credits, real-time sales updates, CRM integration, team collaboration tools, and enhanced visibility into extended networks beyond your 1st-degree connections.";
    }
    
    return "Sales Navigator is LinkedIn's advanced sales prospecting platform that helps sales professionals find, understand, and engage with prospects and accounts more effectively than standard LinkedIn.";
}

function generateRecommendationResponse(keywords, message) {
    if (keywords.includes('strategy')) {
        return "Best Sales Navigator strategies: 1) Build a systematic prospecting routine with daily search activities, 2) Maintain organized saved searches and account lists, 3) Engage with prospect content before reaching out, 4) Use social selling techniques with valuable insights sharing, 5) Track and measure your outreach performance regularly.";
    }
    
    if (keywords.includes('messaging')) {
        return "Top messaging best practices: 1) Research thoroughly before messaging, 2) Reference specific details from their profile or company, 3) Lead with industry insights or valuable resources, 4) Keep initial messages under 300 characters, 5) Follow up strategically with continued value, and 6) Use InMail for prospects outside your network.";
    }
    
    return "For best results with Sales Navigator, focus on building genuine relationships, providing value in every interaction, and maintaining consistent prospecting activities. What specific area would you like recommendations for?";
}

function generateTroubleshootingResponse(keywords, message) {
    if (message.includes('not working') || message.includes('error')) {
        return "Common Sales Navigator issues and solutions: 1) Clear browser cache and cookies, 2) Try using an incognito/private window, 3) Check your subscription status and permissions, 4) Ensure you're using a supported browser, 5) Contact LinkedIn support if problems persist. What specific issue are you experiencing?";
    }
    
    if (message.includes('slow') || message.includes('loading')) {
        return "To improve Sales Navigator performance: 1) Close unnecessary browser tabs, 2) Clear cache and browsing data, 3) Disable browser extensions temporarily, 4) Check your internet connection speed, 5) Try using a different browser. Large searches can also take time to load.";
    }
    
    return "I'm here to help troubleshoot your Sales Navigator challenges. Could you describe the specific issue you're encountering in more detail?";
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
        
    } catch (error) {
        console.error('Error during page initialization:', error);
        // Fallback: set greeting manually if config fails
        const greetingElement = document.querySelector('.help-greeting p');
        if (greetingElement) {
            greetingElement.textContent = "HELLO!! Sam, you saved 15 leads last week. Here are 3 recommendations to boost productivity";
        }
    }
    
    // Create floating help button
    createFloatingHelpButton();
    
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