
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Search, 
  Users, 
  User,
  MessageCircle,
  Bell
} from 'lucide-react';

interface Contact {
  id: string;
  name: string;
  avatar?: string;
  online: boolean;
  lastMessage: string;
  timestamp: string;
  unread: number;
  role?: string;
  isGroup?: boolean;
  members?: number;
}

interface ContactSidebarProps {
  contacts: Contact[];
  selectedContact: string | null;
  onSelectContact: (id: string) => void;
}

export const ContactSidebar: React.FC<ContactSidebarProps> = ({
  contacts,
  selectedContact,
  onSelectContact
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState<'conversas' | 'grupos'>('conversas');

  const filteredContacts = contacts.filter(contact => {
    const matchesSearch = contact.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTab = activeTab === 'conversas' ? !contact.isGroup : contact.isGroup;
    return matchesSearch && matchesTab;
  });

  return (
    <Card className="h-full border-0 shadow-sm rounded-none">
      <CardHeader className="pb-3 border-b">
        <CardTitle className="text-lg font-semibold text-gray-900">Chat</CardTitle>
        
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
          <Input
            placeholder="Buscar conversas..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9 h-10"
          />
        </div>

        <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
          <Button
            variant={activeTab === 'conversas' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setActiveTab('conversas')}
            className="flex-1 h-8 text-xs"
          >
            <MessageCircle size={14} className="mr-1" />
            Conversas
          </Button>
          <Button
            variant={activeTab === 'grupos' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setActiveTab('grupos')}
            className="flex-1 h-8 text-xs"
          >
            <Users size={14} className="mr-1" />
            Grupos
          </Button>
        </div>
      </CardHeader>

      <CardContent className="p-0">
        <ScrollArea className="h-[600px]">
          {filteredContacts.map((contact) => (
            <div
              key={contact.id}
              onClick={() => onSelectContact(contact.id)}
              className={`p-4 border-b cursor-pointer hover:bg-gray-50 transition-colors ${
                selectedContact === contact.id ? 'bg-purple-50 border-r-2 border-r-purple-500' : ''
              }`}
            >
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-blue-500 rounded-full flex items-center justify-center text-white font-semibold">
                    {contact.isGroup ? (
                      <Users size={20} />
                    ) : (
                      <User size={20} />
                    )}
                  </div>
                  {!contact.isGroup && contact.online && (
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                  )}
                  {contact.isGroup && contact.unread > 0 && (
                    <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                      <Bell size={10} className="text-white" />
                    </div>
                  )}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="font-medium text-sm truncate text-gray-900">
                      {contact.name}
                    </h3>
                    <span className="text-xs text-gray-500 ml-2">
                      {contact.timestamp}
                    </span>
                  </div>
                  
                  {contact.role && (
                    <Badge variant="secondary" className="text-xs mb-1">
                      {contact.role}
                    </Badge>
                  )}

                  {contact.isGroup && contact.members && (
                    <p className="text-xs text-gray-500 mb-1">
                      {contact.members} membros
                    </p>
                  )}
                  
                  <div className="flex justify-between items-center">
                    <p className="text-sm text-gray-600 truncate">
                      {contact.lastMessage}
                    </p>
                    {contact.unread > 0 && (
                      <Badge className="bg-purple-500 text-white text-xs ml-2">
                        {contact.unread}
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </ScrollArea>
      </CardContent>
    </Card>
  );
};
