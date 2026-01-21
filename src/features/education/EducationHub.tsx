import { Card } from '@/components/ui/card';

export default function EducationHub() {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Learn About Working Memory</h1>

      <Card className="p-8 bg-surface mb-6">
        <h2 className="text-2xl font-bold mb-4">Educational Content Coming Soon</h2>
        <p className="text-text-secondary mb-4">
          We're preparing comprehensive modules to help you understand the science behind working memory training:
        </p>
        <ul className="space-y-2 text-text-secondary">
          <li>• Introduction to Working Memory</li>
          <li>• The Science of Neuroplasticity</li>
          <li>• Dual N-Back Explained</li>
          <li>• Cognitive Load Theory</li>
          <li>• Training Best Practices</li>
          <li>• Transfer Effects & Real-World Applications</li>
        </ul>
      </Card>
    </div>
  );
}
