
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { CheckCircle, AlertCircle, XCircle } from 'lucide-react';

interface PhotoAnalysis {
  overall_condition_score: number;
  modernization_score: number;
  condition_summary: string;
  modernization_summary: string;
  room_assessments: {
    kitchen?: string;
    bathrooms?: string;
    living_areas?: string;
    bedrooms?: string;
  };
  key_observations: {
    modern_features: string[];
    areas_needing_improvement: string[];
    renovation_timeline: string;
  };
  market_readiness: {
    move_in_ready: boolean;
    condition_category: string;
    recommended_improvements: string[];
  };
}

interface PhotoAnalysisDisplayProps {
  analysis: PhotoAnalysis;
}

export const PhotoAnalysisDisplay = ({ analysis }: PhotoAnalysisDisplayProps) => {
  const getScoreColor = (score: number) => {
    if (score >= 8) return 'text-green-600';
    if (score >= 6) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getConditionIcon = (category: string) => {
    switch (category) {
      case 'Excellent':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'Good':
        return <CheckCircle className="w-5 h-5 text-blue-600" />;
      case 'Fair':
        return <AlertCircle className="w-5 h-5 text-yellow-600" />;
      case 'Needs Work':
        return <XCircle className="w-5 h-5 text-red-600" />;
      default:
        return <AlertCircle className="w-5 h-5 text-gray-600" />;
    }
  };

  const getConditionColor = (category: string) => {
    switch (category) {
      case 'Excellent':
        return 'bg-green-100 text-green-800';
      case 'Good':
        return 'bg-blue-100 text-blue-800';
      case 'Fair':
        return 'bg-yellow-100 text-yellow-800';
      case 'Needs Work':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Overall Scores */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            {getConditionIcon(analysis.market_readiness.condition_category)}
            Property Analysis Results
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">Overall Condition</span>
                <span className={`text-lg font-bold ${getScoreColor(analysis.overall_condition_score)}`}>
                  {analysis.overall_condition_score}/10
                </span>
              </div>
              <Progress value={analysis.overall_condition_score * 10} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">Modernization Level</span>
                <span className={`text-lg font-bold ${getScoreColor(analysis.modernization_score)}`}>
                  {analysis.modernization_score}/10
                </span>
              </div>
              <Progress value={analysis.modernization_score * 10} className="h-2" />
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Badge className={getConditionColor(analysis.market_readiness.condition_category)}>
              {analysis.market_readiness.condition_category}
            </Badge>
            <Badge variant={analysis.market_readiness.move_in_ready ? 'default' : 'secondary'}>
              {analysis.market_readiness.move_in_ready ? 'Move-in Ready' : 'Needs Preparation'}
            </Badge>
            <Badge variant="outline">
              {analysis.key_observations.renovation_timeline}
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Summaries */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Condition Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">{analysis.condition_summary}</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Modernization Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">{analysis.modernization_summary}</p>
          </CardContent>
        </Card>
      </div>

      {/* Room Assessments */}
      {Object.keys(analysis.room_assessments).length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Room by Room Assessment</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {Object.entries(analysis.room_assessments).map(([room, assessment]) => (
              assessment && (
                <div key={room}>
                  <h4 className="font-medium capitalize mb-1">{room.replace('_', ' ')}</h4>
                  <p className="text-sm text-muted-foreground">{assessment}</p>
                </div>
              )
            ))}
          </CardContent>
        </Card>
      )}

      {/* Key Observations */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {analysis.key_observations.modern_features.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg text-green-600">Modern Features</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-1">
                {analysis.key_observations.modern_features.map((feature, index) => (
                  <li key={index} className="text-sm flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        )}

        {analysis.key_observations.areas_needing_improvement.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg text-yellow-600">Areas for Improvement</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-1">
                {analysis.key_observations.areas_needing_improvement.map((area, index) => (
                  <li key={index} className="text-sm flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-yellow-500 flex-shrink-0" />
                    {area}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Recommendations */}
      {analysis.market_readiness.recommended_improvements.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Recommended Improvements</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-1">
              {analysis.market_readiness.recommended_improvements.map((improvement, index) => (
                <li key={index} className="text-sm flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-blue-500 flex-shrink-0" />
                  {improvement}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
