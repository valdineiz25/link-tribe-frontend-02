
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { 
  User,
  Bell,
  Shield,
  Eye,
  Moon,
  Sun
} from 'lucide-react';

const Settings: React.FC = () => {
  const { user } = useAuth();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    marketing: false,
    comments: true,
    mentions: true
  });
  
  const [privacy, setPrivacy] = useState({
    profilePublic: true,
    showEmail: false,
    showPhone: false,
    allowMessages: true
  });

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-2">Configurações</h1>
        <p className="text-gray-600">Gerencie suas preferências e dados da conta</p>
      </div>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="profile" className="flex items-center space-x-2">
            <User size={16} />
            <span className="hidden sm:inline">Perfil</span>
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center space-x-2">
            <Bell size={16} />
            <span className="hidden sm:inline">Notificações</span>
          </TabsTrigger>
          <TabsTrigger value="privacy" className="flex items-center space-x-2">
            <Shield size={16} />
            <span className="hidden sm:inline">Privacidade</span>
          </TabsTrigger>
          <TabsTrigger value="appearance" className="flex items-center space-x-2">
            <Eye size={16} />
            <span className="hidden sm:inline">Aparência</span>
          </TabsTrigger>
        </TabsList>

        {/* Perfil */}
        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle>Editar Perfil</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nome Completo</Label>
                  <Input id="name" defaultValue={user?.name} />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">E-mail</Label>
                  <Input id="email" type="email" defaultValue={user?.email} />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="phone">Telefone</Label>
                  <Input id="phone" defaultValue={user?.phone} />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="cpf">CPF</Label>
                  <Input id="cpf" defaultValue={user?.cpf} disabled />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="state">Estado</Label>
                  <Input id="state" defaultValue={user?.state} />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="city">Cidade</Label>
                  <Input id="city" defaultValue={user?.city} />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea 
                  id="bio" 
                  placeholder="Conte um pouco sobre você e sua área de atuação..."
                  className="min-h-[100px]"
                />
              </div>

              <div className="space-y-4">
                <h3 className="font-medium">Alterar Senha</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="currentPassword">Senha Atual</Label>
                    <Input id="currentPassword" type="password" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="newPassword">Nova Senha</Label>
                    <Input id="newPassword" type="password" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirmar Senha</Label>
                    <Input id="confirmPassword" type="password" />
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-2">
                <Button variant="outline">Cancelar</Button>
                <Button>Salvar Alterações</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notificações */}
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Preferências de Notificação</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="font-medium">Notificações por E-mail</h3>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="email-notifications">Notificações Gerais</Label>
                    <p className="text-sm text-gray-500">Receber atualizações importantes por e-mail</p>
                  </div>
                  <Switch 
                    id="email-notifications"
                    checked={notifications.email}
                    onCheckedChange={(checked) => 
                      setNotifications(prev => ({ ...prev, email: checked }))
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="marketing-emails">E-mails de Marketing</Label>
                    <p className="text-sm text-gray-500">Novidades sobre produtos e promoções</p>
                  </div>
                  <Switch 
                    id="marketing-emails"
                    checked={notifications.marketing}
                    onCheckedChange={(checked) => 
                      setNotifications(prev => ({ ...prev, marketing: checked }))
                    }
                  />
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-medium">Notificações Push</h3>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="push-notifications">Notificações Push</Label>
                    <p className="text-sm text-gray-500">Receber notificações no navegador</p>
                  </div>
                  <Switch 
                    id="push-notifications"
                    checked={notifications.push}
                    onCheckedChange={(checked) => 
                      setNotifications(prev => ({ ...prev, push: checked }))
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="comments-notifications">Comentários</Label>
                    <p className="text-sm text-gray-500">Quando alguém comenta em seus posts</p>
                  </div>
                  <Switch 
                    id="comments-notifications"
                    checked={notifications.comments}
                    onCheckedChange={(checked) => 
                      setNotifications(prev => ({ ...prev, comments: checked }))
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="mentions-notifications">Menções</Label>
                    <p className="text-sm text-gray-500">Quando alguém te menciona</p>
                  </div>
                  <Switch 
                    id="mentions-notifications"
                    checked={notifications.mentions}
                    onCheckedChange={(checked) => 
                      setNotifications(prev => ({ ...prev, mentions: checked }))
                    }
                  />
                </div>
              </div>

              <div className="flex justify-end">
                <Button>Salvar Preferências</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Privacidade */}
        <TabsContent value="privacy">
          <Card>
            <CardHeader>
              <CardTitle>Configurações de Privacidade</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="font-medium">Visibilidade do Perfil</h3>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="profile-public">Perfil Público</Label>
                    <p className="text-sm text-gray-500">Permitir que outros usuários vejam seu perfil</p>
                  </div>
                  <Switch 
                    id="profile-public"
                    checked={privacy.profilePublic}
                    onCheckedChange={(checked) => 
                      setPrivacy(prev => ({ ...prev, profilePublic: checked }))
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="show-email">Mostrar E-mail</Label>
                    <p className="text-sm text-gray-500">Exibir seu e-mail no perfil público</p>
                  </div>
                  <Switch 
                    id="show-email"
                    checked={privacy.showEmail}
                    onCheckedChange={(checked) => 
                      setPrivacy(prev => ({ ...prev, showEmail: checked }))
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="show-phone">Mostrar Telefone</Label>
                    <p className="text-sm text-gray-500">Exibir seu telefone no perfil público</p>
                  </div>
                  <Switch 
                    id="show-phone"
                    checked={privacy.showPhone}
                    onCheckedChange={(checked) => 
                      setPrivacy(prev => ({ ...prev, showPhone: checked }))
                    }
                  />
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-medium">Comunicação</h3>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="allow-messages">Permitir Mensagens</Label>
                    <p className="text-sm text-gray-500">Outros usuários podem te enviar mensagens</p>
                  </div>
                  <Switch 
                    id="allow-messages"
                    checked={privacy.allowMessages}
                    onCheckedChange={(checked) => 
                      setPrivacy(prev => ({ ...prev, allowMessages: checked }))
                    }
                  />
                </div>
              </div>

              <div className="flex justify-end">
                <Button>Salvar Configurações</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Aparência */}
        <TabsContent value="appearance">
          <Card>
            <CardHeader>
              <CardTitle>Preferências de Aparência</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="font-medium">Tema</h3>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    {isDarkMode ? <Moon size={20} /> : <Sun size={20} />}
                    <div>
                      <Label htmlFor="dark-mode">Modo Escuro</Label>
                      <p className="text-sm text-gray-500">
                        {isDarkMode ? 'Tema escuro ativado' : 'Tema claro ativado'}
                      </p>
                    </div>
                  </div>
                  <Switch 
                    id="dark-mode"
                    checked={isDarkMode}
                    onCheckedChange={setIsDarkMode}
                  />
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-medium">Idioma</h3>
                <div>
                  <Label htmlFor="language">Idioma da Interface</Label>
                  <select className="w-full mt-2 p-2 border rounded-md">
                    <option value="pt-BR">Português (Brasil)</option>
                    <option value="en-US">English (US)</option>
                    <option value="es-ES">Español</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end">
                <Button>Salvar Preferências</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;
