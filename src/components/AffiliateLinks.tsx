
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Share2, ExternalLink } from 'lucide-react';

interface AffiliateLink {
  id: string;
  title: string;
  url: string;
  clicks: number;
  commission: string;
  earnings: string;
}

interface AffiliateLinksProps {
  isOwnProfile: boolean;
}

const AffiliateLinks: React.FC<AffiliateLinksProps> = ({ isOwnProfile }) => {
  const mockAffiliateLinks: AffiliateLink[] = [
    {
      id: '1',
      title: 'Curso de Marketing Digital',
      url: 'https://example.com/curso-marketing',
      clicks: 245,
      commission: '15%',
      earnings: 'R$ 1.234,50'
    },
    {
      id: '2',
      title: 'E-book Finanças Pessoais',
      url: 'https://example.com/ebook-financas',
      clicks: 89,
      commission: '20%',
      earnings: 'R$ 567,80'
    }
  ];

  if (!isOwnProfile) return null;

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>Meus Links Afiliados</CardTitle>
          <Button size="sm">
            <Plus size={16} className="mr-2" />
            Adicionar Link
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {mockAffiliateLinks.map((link) => (
            <div key={link.id} className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex-1">
                <h3 className="font-medium">{link.title}</h3>
                <p className="text-sm text-gray-600">{link.url}</p>
                <div className="flex space-x-4 text-xs text-gray-500 mt-1">
                  <span>{link.clicks} cliques</span>
                  <span>Comissão: {link.commission}</span>
                  <span className="text-green-600 font-medium">{link.earnings}</span>
                </div>
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm">
                  <Share2 size={16} />
                </Button>
                <Button variant="outline" size="sm">
                  <ExternalLink size={16} />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default AffiliateLinks;
