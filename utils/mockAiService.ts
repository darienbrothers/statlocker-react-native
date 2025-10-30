import type { GameLogFormData } from '../types';
import Constants from 'expo-constants';

// Mock chat responses based on context
const mockChatResponses: Record<string, string> = {
  "review last game": `Great performance in your last game! Here's what stood out:

**🏆 Strengths:**
- Your positioning was excellent—you cut down angles effectively
- Clear percentage improved significantly (87% vs 75% average)

**📈 Focus Areas:**
- Work on quick recovery after high saves
- Practice clearing under pressure

Keep this momentum going! 💪`,

  "set weekly focus": `Based on your recent games, here's your **weekly focus plan**:

**Primary Goal:** Maintain consistent save percentage above 78%

**Daily Focus:**
- **Monday-Tuesday:** High shot drills (top corners)
- **Wednesday:** Clear accuracy under pressure
- **Thursday:** Recovery positioning after saves
- **Friday:** Game prep visualization

**Track:** Your high shot save rate—aim for 70%+ this week. You've been at 65%, so this is achievable!`,

  "recommend drills": `Here are **targeted drills** for your current goals:

**1. High Shot Challenge** (20 min)
- Partner throws at top corners
- Focus on hand placement and quick extension
- Target: 15 successful saves

**2. Clear Under Pressure** (15 min)
- Coach applies pressure, simulate game situations
- Aim for 85% accuracy
- Focus on footwork and decision-making

**3. Recovery Positioning** (10 min)
- Save → quick reset → next save
- Emphasize staying on your line
- Build muscle memory for game speed

Start with drill #1 today—it addresses your biggest improvement area!`,

  "explain this trend": `Looking at your **trend data**:

**Save Percentage: ↗️ Upward Trend**
Your last 5 games show a consistent climb from 72% → 78.5%. This indicates:
- Improved game awareness
- Better shot prediction
- Stronger fundamentals

**Clear Percentage: ⚠️ Slight Dip**
Recent games show clear% dropping from 90% → 85%. Likely causes:
- Increased pressure situations
- Fatigue in later quarters
- Need for faster decision-making

**Recommendation:** Focus drills on 4th quarter simulation to maintain consistency throughout the game.`
};

// Generate mock game analysis
export const generateMockGameAnalysis = (data: GameLogFormData): string => {
  const shotsFaced = (data.saves || 0) + (data.goalsAllowed || 0);
  const savePercentage = shotsFaced > 0 
    ? (((data.saves || 0) / shotsFaced) * 100).toFixed(0) 
    : '0';
  
  const isStrongPerformance = parseFloat(savePercentage) >= 75;
  const isVeryStrong = parseFloat(savePercentage) >= 80;
  
  let analysis = "";
  
  if (isVeryStrong) {
    analysis = `**Outstanding performance! 🎯**\n\n`;
    analysis += `Your ${savePercentage}% save rate shows exceptional positioning and awareness. `;
    analysis += `Your saves in key moments likely made the difference.`;
    if (data.successfulClears && data.totalClearsAttempted > 0) {
      const clearRate = ((data.successfulClears / data.totalClearsAttempted) * 100).toFixed(0);
      analysis += ` Your ${clearRate}% clear rate demonstrates strong decision-making under pressure.`;
    }
    if (data.groundBalls && data.groundBalls > 0) {
      analysis += ` Your ${data.groundBalls} ground balls show excellent field awareness.`;
    }
    analysis += `\n\n**Keep it up!** Maintain this level and you'll easily hit your season goals.`;
  } else if (isStrongPerformance) {
    analysis = `**Solid game! 💪**\n\n`;
    analysis += `Your ${savePercentage}% save percentage is strong. `;
    if (data.goalsAllowed && data.goalsAllowed > 0) {
      analysis += `Focus on reading shooter tendencies earlier—especially on the ${data.goalsAllowed} goals allowed. `;
    }
    if (data.groundBalls && data.groundBalls > 0) {
      analysis += `Your ${data.groundBalls} ground balls show good field awareness.`;
    }
    analysis += `\n\n**Next game focus:** Quick recovery after saves and maintaining consistency in high-pressure moments.`;
  } else {
    analysis = `**Learning opportunity 📚**\n\n`;
    analysis += `This game provides valuable feedback. `;
    if (data.saves && data.saves > 0) {
      analysis += `Your ${data.saves} saves show promise—build on this. `;
    }
    analysis += `Focus on fundamentals: positioning, angle play, and communication with your defense.`;
    analysis += `\n\n**Improvement areas:** Practice high shots and work on quick recovery positioning. Every game is a chance to grow!`;
  }
  
  if (data.notes && data.notes.length > 10) {
    analysis += `\n\n**Your notes insight:** ${data.notes.substring(0, 100)}${data.notes.length > 100 ? '...' : ''}`;
  }
  
  return analysis;
};

// Generate mock chat response
export const generateMockChatResponse = (userMessage: string): string => {
  const normalized = userMessage.toLowerCase().trim();
  
  // Check for exact matches
  for (const [key, response] of Object.entries(mockChatResponses)) {
    if (normalized.includes(key)) {
      return response;
    }
  }
  
  // Generic responses based on keywords
  if (normalized.includes("trend") || normalized.includes("stats") || normalized.includes("performance")) {
    return `Looking at your performance data, you're on an **upward trajectory**! 📈

Your save percentage has improved from 72% to 78.5% over the last 8 games. This suggests:
- Better game awareness
- Improved positioning
- Stronger fundamentals

**What's working:** Your consistency in the last 5 games has been exceptional. Keep focusing on angle play and reading shooters early.

Want me to break down a specific stat or recommend drills?`;
  }
  
  if (normalized.includes("drill") || normalized.includes("practice") || normalized.includes("training")) {
    return `Here are **3 targeted drills** for your skill level:

**1. High Corner Challenge** (15 min)
- Partner throws at top corners at game speed
- Focus on hand extension and positioning
- Goal: 12/15 successful saves

**2. Pressure Clear Simulation** (20 min)
- Live pressure situations
- Emphasize accuracy and decision-making
- Target: 85%+ success rate

**3. Recovery & Reset** (10 min)
- Rapid-fire save sequences
- Quick reset between shots
- Build game-speed muscle memory

Which one do you want to focus on this week? 💪`;
  }
  
  if (normalized.includes("goal") || normalized.includes("target") || normalized.includes("achieve")) {
    return `Your **season goal of 80% save percentage** is very achievable! 🎯

**Current Progress:** 78.5% (just 1.5% away!)

**What you need:**
- Maintain current form
- Focus on high shots (your biggest opportunity)
- Stay consistent in practice

You're on track to hit this goal in the next 3-4 games if you maintain your current trajectory. Want specific drills to push you over the edge?`;
  }
  
  if (normalized.includes("save") || normalized.includes("saves")) {
    return `Your **save performance** is trending upward! 📊

**Current Stats:**
- Average Save %: 78.5%
- Total Saves: 142
- Best Game: 85% (last week)

**Key Insights:**
- Your low shot saves are exceptional (82%)
- High shot saves need work (65% - focus area)
- Consistency is your strength

**Quick Tip:** Focus on hand positioning for high corners. Practice raising your stick earlier to cut off those top corners more effectively.

Want a specific drill recommendation?`;
  }
  
  // Default helpful response
  return `Thanks for asking! As your AI Coach, I'm here to help you analyze your performance and improve your game.

**Quick Stats:**
- Current Save %: 78.5%
- Season Goal: 80% (almost there! 📈)
- Recent Trend: 5-game hot streak

**I can help you with:**
- Game analysis and feedback
- Drill recommendations
- Performance trends
- Goal tracking

Try one of the quick actions below, or ask me anything about your performance!`;
};

// Check if we should use mock mode (React Native compatible)
export const shouldUseMockMode = (): boolean => {
  // Check for USE_MOCK_AI environment variable
  const forceMock = Constants.expoConfig?.extra?.USE_MOCK_AI === 'true' || 
                    Constants.expoConfig?.extra?.useMockAi === true;
  if (forceMock) return true;
  
  // Check if API key exists
  const apiKey = Constants.expoConfig?.extra?.GEMINI_API_KEY || 
                 Constants.expoConfig?.extra?.apiKey;
  
  // Use mock mode if no API key or key is empty/invalid
  return !apiKey || apiKey === '' || apiKey === 'undefined';
};

// Simulate API delay for realistic UX
export const simulateApiDelay = (ms: number = 1000): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

