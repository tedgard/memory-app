import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

interface Article {
  id: string;
  title: string;
  excerpt: string;
  icon: string;
  content: string;
}

const articles: Article[] = [
  {
    id: 'intro',
    title: 'Introduction to Working Memory',
    excerpt: 'Learn what working memory is and why it matters for cognitive performance',
    icon: '🧠',
    content: `Working memory is your brain's notepad - a limited-capacity system that temporarily holds and manipulates information for complex cognitive tasks like learning, reasoning, and comprehension.

**The Three Components:**

1. **Phonological Loop**: Handles verbal and auditory information (like remembering a phone number)
2. **Visuospatial Sketchpad**: Processes visual and spatial information (like navigating a route)
3. **Central Executive**: Coordinates attention and integrates information from the other systems

**Why It Matters:**

Working memory capacity strongly correlates with fluid intelligence - your ability to solve novel problems and think abstractly. Research shows that individuals with higher working memory capacity perform better on:

• Academic tasks and learning new skills
• Complex problem-solving
• Reading comprehension
• Mathematics and logical reasoning
• Multitasking and focus

**The Good News:**

Unlike many cognitive abilities, working memory can be improved through targeted training. Studies show that intensive working memory training can lead to measurable improvements in both working memory capacity and fluid intelligence.`,
  },
  {
    id: 'neuroplasticity',
    title: 'The Science of Neuroplasticity',
    excerpt: 'Understand how your brain changes and adapts through training',
    icon: '🔬',
    content: `Neuroplasticity is your brain's remarkable ability to reorganize itself by forming new neural connections throughout life. This is the scientific foundation for why cognitive training works.

**How Training Changes Your Brain:**

When you consistently challenge your working memory, several changes occur:

1. **Synaptic Strengthening**: Connections between neurons become stronger and more efficient
2. **Increased Neural Activation**: Brain regions involved in working memory show enhanced activity
3. **Structural Changes**: Gray matter density can increase in areas like the prefrontal cortex
4. **Network Optimization**: Neural networks become more efficient at processing information

**The Training Effect:**

Research using fMRI scans shows that after 4-6 weeks of working memory training:

• Increased activity in the prefrontal and parietal cortex
• Enhanced dopamine receptor density
• Improved communication between brain regions
• More efficient neural processing (doing more with less activation)

**The Critical Window:**

While neuroplasticity occurs throughout life, the rate and extent of change decrease with age. However, studies show significant improvements are possible at any age with consistent training.

**Key Principles:**

• Consistency beats intensity - daily practice is more effective than occasional long sessions
• Progressive challenge is essential - the brain adapts to demands slightly beyond current capacity
• Transfer effects occur when training is sufficiently challenging and sustained`,
  },
  {
    id: 'dual-nback',
    title: 'Dual N-Back Explained',
    excerpt: 'Why this exercise is the gold standard for working memory training',
    icon: '🎯',
    content: `The Dual N-Back task is considered the most effective working memory training exercise, backed by extensive scientific research.

**How It Works:**

You track two streams of information simultaneously:
• Visual: Positions on a grid
• Auditory: Spoken letters

You respond when either stimulus matches the one presented N positions back in the sequence.

**Why It's So Effective:**

1. **Dual Modality**: Engages both visuospatial and verbal working memory systems
2. **Active Updating**: Requires constant addition of new information and removal of old
3. **Interference Management**: Must maintain separate sequences while preventing cross-contamination
4. **Adaptive Difficulty**: The N-level adjusts to maintain optimal cognitive load

**The Research:**

A landmark 2008 study by Jaeggi et al. demonstrated that Dual N-Back training:
• Improved fluid intelligence (Gf) in a dose-dependent manner
• Showed transfer effects to untrained tasks
• Produced gains that persisted after training ended

Subsequent studies have replicated these findings, with meta-analyses showing:
• Average improvement of 3-4 IQ points after 4 weeks
• Greatest benefits for those training 20+ minutes daily
• Effects maintained for at least 8 months post-training

**Optimal Training Protocol:**

• Start at 2-back or 3-back level
• Train for 20-30 minutes daily
• Aim for 80-85% accuracy before advancing
• Take 1-2 rest days per week
• Continue for minimum 4-6 weeks for measurable gains`,
  },
  {
    id: 'best-practices',
    title: 'Training Best Practices',
    excerpt: 'Maximize your results with evidence-based training strategies',
    icon: '⚡',
    content: `Follow these scientifically-validated principles to get the most from your working memory training.

**Training Schedule:**

**Duration**: 20-30 minutes per session
• Studies show 20+ minutes is the sweet spot for neuroplastic changes
• Sessions under 15 minutes show minimal transfer effects
• Beyond 30 minutes, fatigue reduces training quality

**Frequency**: 5-6 days per week
• Daily training produces better results than sporadic long sessions
• Take 1-2 rest days weekly for consolidation
• Consistency over 4+ weeks is crucial for lasting changes

**Optimal Difficulty:**

**Stay in the Challenge Zone:**
• Target 70-85% accuracy
• Too easy (>90%) = minimal cognitive demand
• Too hard (<60%) = frustration and learned helplessness
• The app automatically adjusts difficulty to keep you in this zone

**When to Train:**

**Time of Day Matters:**
• Peak cognitive performance occurs 2-4 hours after waking
• Avoid training when tired, stressed, or distracted
• Some evidence suggests morning training enhances consolidation

**Environment:**
• Quiet space free from interruptions
• Good hydration and blood sugar levels
• Avoid training after alcohol or when sleep-deprived

**Additional Tips:**

• Use headphones for audio stimuli
• Sit upright and stay alert
• Take breaks between rounds if needed
• Track your progress to stay motivated
• Combine with physical exercise for enhanced neuroplasticity`,
  },
  {
    id: 'transfer-effects',
    title: 'Transfer Effects',
    excerpt: 'How training translates to real-world cognitive improvements',
    icon: '🚀',
    content: `The ultimate goal of working memory training is not to get better at the game, but to improve real-world cognitive performance. Research shows robust transfer effects to various domains.

**Near Transfer (Direct Applications):**

**Academic Performance:**
• Improved reading comprehension and retention
• Better math problem-solving
• Enhanced note-taking and study efficiency
• Faster learning of new languages

**Professional Tasks:**
• Managing complex projects with many variables
• Following multi-step procedures accurately
• Adapting to changing priorities and contexts
• Improved focus during meetings and presentations

**Far Transfer (Broader Cognitive Gains):**

**Fluid Intelligence:**
• Enhanced abstract reasoning
• Better pattern recognition
• Improved problem-solving in novel situations
• Faster learning of new skills

**Attention Control:**
• Reduced susceptibility to distraction
• Better task-switching ability
• Improved sustained attention
• Enhanced selective attention in noisy environments

**Real-World Impact Timeline:**

**Week 1-2:**
• Improved focus during cognitively demanding tasks
• Better retention of information in conversations
• Enhanced ability to follow complex instructions

**Week 3-4:**
• Noticeable improvements in multitasking
• Faster mental calculations
• Better recall of recently learned information
• Reduced mental fatigue during complex work

**Week 5-8:**
• Measurable IQ gains (3-5 points on average)
• Improved academic or professional performance
• Enhanced creative problem-solving
• Better emotional regulation under cognitive load

**Long-term Benefits:**

Studies show that improvements can last 8+ months after training ends, particularly when:
• Training lasted 4+ weeks
• Combined with ongoing cognitive challenges
• Integrated into regular mental fitness routine

**Maximizing Transfer:**

• Train consistently for at least 4-6 weeks
• Consciously apply improved working memory in daily tasks
• Combine with other cognitive activities (reading, puzzles, learning)
• Maintain physical exercise and healthy sleep habits`,
  },
  {
    id: 'cognitive-load',
    title: 'Cognitive Load Theory',
    excerpt: 'Understanding optimal challenge for maximum brain growth',
    icon: '⚖️',
    content: `Cognitive Load Theory explains why working memory training must be calibrated to the right level of difficulty to drive improvement.

**The Three Types of Cognitive Load:**

**Intrinsic Load:**
• Inherent difficulty of the material
• In N-back, this is the N-level (2-back, 3-back, etc.)
• Should be challenging but manageable

**Extraneous Load:**
• Mental effort from poor design or distractions
• Minimized through clear interfaces and focused environment
• Why you should train in a quiet space

**Germane Load:**
• Effort devoted to learning and schema formation
• This is the "good" load that drives improvement
• Maximized when intrinsic load is optimal

**The Optimal Challenge Zone:**

**Too Easy (<70% difficulty):**
• Minimal germane load
• Brain doesn't need to adapt
• No neuroplastic changes

**Optimal (70-85% difficulty):**
• High germane load
• Brain works at capacity edge
• Maximal neuroplastic response
• This is where growth happens

**Too Hard (>95% difficulty):**
• Cognitive overload
• Working memory capacity exceeded
• Performance breakdown and frustration
• Counter-productive for learning

**Adaptive Difficulty:**

The app automatically adjusts difficulty to keep you in the optimal zone:
• 3 successful sessions → difficulty increases
• 3 struggling sessions → difficulty decreases
• This ensures continued progress without burnout

**Progressive Overload:**

Like physical exercise, cognitive training requires progressive challenge:
• Start at comfortable level (2-back)
• Gradually increase as capacity improves
• Each small increase drives adaptation
• Over weeks, significant improvements accumulate

**Individual Differences:**

• Starting capacity varies widely
• Rate of improvement differs by person
• Age, baseline ability, and consistency all factor in
• Focus on personal progress, not comparisons`,
  },
  {
    id: 'operation-span',
    title: 'Operation Span Task',
    excerpt: 'Understanding dual-task working memory assessment',
    icon: '➕',
    content: `The Operation Span (OSPAN) task is a widely used measure of working memory capacity that requires managing two cognitive demands simultaneously.

**Task Structure:**

The OSPAN task combines:
• **Processing Task**: Solving simple math equations (e.g., "Is 4 + 2 = 7?")
• **Storage Task**: Remembering a sequence of letters

Participants must alternate between solving equations and encoding letters, then recall all letters in order.

**Why It's Effective:**

**Dual-Task Demand:**
• Simulates real-world cognitive load where you must process and store information simultaneously
• Common in daily activities like following directions while remembering a shopping list
• Tests the central executive component of working memory

**Working Memory Components:**
• Requires active maintenance of information
• Demands resistance to interference from the processing task
• Involves updating and manipulation of stored information

**The Science:**

Research by Engle and colleagues has shown that OSPAN performance:
• Strongly predicts fluid intelligence
• Correlates with reading comprehension ability
• Predicts academic performance
• Relates to attention control capacity

**Transfer Effects:**

Training on operation span tasks improves:
• Ability to maintain focus while multitasking
• Performance on complex cognitive tasks requiring simultaneous processing and storage
• Resistance to distraction during goal-directed behavior
• Task-switching efficiency

**Optimal Training:**

• Start with 3-4 item sequences
• Maintain 70-80% accuracy on math problems
• Gradually increase sequence length
• Train for 15-20 minutes per session
• Focus on both speed and accuracy

**Real-World Applications:**

• Note-taking while listening to lectures
• Following multi-step instructions at work
• Managing multiple projects simultaneously
• Cooking while following a recipe
• Driving while processing navigation instructions`,
  },
  {
    id: 'spatial-memory',
    title: 'Spatial Working Memory',
    excerpt: 'The Corsi Block Test and visuospatial processing',
    icon: '📍',
    content: `Spatial working memory is crucial for navigation, visual reasoning, and many professional tasks. The Corsi Block Test is the gold standard for assessing visuospatial memory capacity.

**The Corsi Block Test:**

**Original Design:**
• Created by Philip Corsi in 1972
• Consists of 9 blocks arranged on a board
• Experimenter taps blocks in sequence
• Participant must reproduce the sequence

**Digital Version:**
• Grid of cells that light up sequentially
• User taps cells in the same order
• Difficulty increases with longer sequences
• Typical span: 4-7 items

**Visuospatial vs Verbal Working Memory:**

**Different Systems:**
• Visuospatial: Processes visual and spatial information
• Verbal: Handles language-based information
• Relatively independent but can interact
• Training one may not directly transfer to the other

**Brain Regions:**
• Right hemisphere dominant for spatial tasks
• Parietal cortex for spatial attention
• Prefrontal cortex for manipulation
• Hippocampus for spatial memory consolidation

**Why Spatial Memory Matters:**

**Navigation:**
• Finding your way in new environments
• Mental rotation of maps
• Remembering locations of objects
• Planning optimal routes

**Professional Applications:**
• Architecture and design
• Surgery and medical procedures
• Engineering and mechanics
• Sports and athletics
• Air traffic control

**Problem Solving:**
• Mental visualization of problems
• Spatial reasoning in mathematics
• Chess and strategy games
• Assembly and construction tasks

**Training Benefits:**

Research shows spatial working memory training improves:
• Navigation ability and sense of direction
• Mental rotation speed
• Visual attention and scanning
• Spatial reasoning in mathematics
• Performance in STEM fields

**Optimal Training Protocol:**

• Start at span length 4
• Progress when achieving 80%+ accuracy
• Train both forward and backward sequences
• Include mental rotation variants
• Practice 15-20 minutes daily

**Transfer to Daily Life:**

**Week 1-2:**
• Easier navigation in familiar environments
• Better recall of where you placed items
• Improved ability to follow visual diagrams

**Week 3-4:**
• Enhanced mental visualization
• Better parking and spatial maneuvering
• Improved map reading and orientation

**Week 5+:**
• Significant improvements in spatial reasoning
• Enhanced performance in spatial tasks at work
• Better memory for faces and visual details
• Improved ability to pack and organize spaces

**Complementary Training:**

Combine spatial memory training with:
• Physical navigation practice
• Puzzle solving (jigsaw, Rubik's cube)
• Drawing and visual arts
• Video games requiring spatial skills
• Mental rotation exercises`,
  },
];

export default function EducationHub() {
  const [selectedArticle, setSelectedArticle] = useState<string | null>(null);

  const article = articles.find((a) => a.id === selectedArticle);

  if (article) {
    return (
      <div className="max-w-4xl mx-auto">
        <Button onClick={() => setSelectedArticle(null)} variant="outline" className="mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Articles
        </Button>

        <Card className="p-6 md:p-8 bg-surface">
          <div className="text-4xl md:text-5xl mb-4">{article.icon}</div>
          <h1 className="text-2xl md:text-3xl font-bold mb-6">{article.title}</h1>
          <div className="prose prose-invert prose-sm md:prose-base max-w-none">
            {article.content.split('\n\n').map((paragraph, index) => {
              // Heading: **Heading:**
              if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
                return (
                  <h3 key={index} className="text-lg md:text-xl font-bold mt-6 mb-3">
                    {paragraph.replace(/\*\*/g, '')}
                  </h3>
                );
              }
              // Bulleted list
              if (paragraph.startsWith('•')) {
                const items = paragraph.split('\n').filter((line) => line.trim());
                return (
                  <ul key={index} className="list-disc list-inside space-y-1 mb-4 text-text-secondary">
                    {items.map((item, i) => (
                      <li key={i}>{item.replace('•', '').trim()}</li>
                    ))}
                  </ul>
                );
              }
              // Numbered list
              if (/^\d+\./.test(paragraph.trim())) {
                const items = paragraph.split('\n').filter((line) => line.trim());
                return (
                  <ol key={index} className="list-decimal list-inside space-y-1 mb-4 text-text-secondary">
                    {items.map((item, i) => (
                      <li key={i}>{item.replace(/^\d+\.\s*/, '').replace(/\*\*/g, '').trim()}</li>
                    ))}
                  </ol>
                );
              }
              // Regular paragraph with inline bold
              const parts = paragraph.split(/(\*\*.*?\*\*)/g);
              return (
                <p key={index} className="mb-4 text-sm md:text-base leading-relaxed text-text-secondary">
                  {parts.map((part, i) => {
                    if (part.startsWith('**') && part.endsWith('**')) {
                      return (
                        <strong key={i} className="font-semibold text-text-primary">
                          {part.replace(/\*\*/g, '')}
                        </strong>
                      );
                    }
                    return part;
                  })}
                </p>
              );
            })}
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold mb-2">Learn About Working Memory</h1>
        <p className="text-sm md:text-base text-text-secondary">
          Evidence-based insights into cognitive training and neuroplasticity
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {articles.map((article) => (
          <Card
            key={article.id}
            className="p-6 bg-surface hover:bg-surface/80 transition-colors cursor-pointer"
            onClick={() => setSelectedArticle(article.id)}
          >
            <div className="text-4xl mb-3">{article.icon}</div>
            <h3 className="text-lg font-bold mb-2">{article.title}</h3>
            <p className="text-sm text-text-secondary mb-4">{article.excerpt}</p>
            <Button variant="outline" size="sm" className="w-full">
              Read Article
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
}
