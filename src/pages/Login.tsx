
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Eye, EyeOff, Mail, Lock, LogIn, User, DollarSign, CheckCircle, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

type UserType = 'user' | 'affiliate';

const userSchema = yup.object({
  email: yup.string().email('E-mail inválido').required('E-mail é obrigatório'),
  password: yup.string().min(6, 'Senha deve ter pelo menos 6 caracteres').required('Senha é obrigatória'),
});

const affiliateSchema = yup.object({
  email: yup.string().email('E-mail inválido').required('E-mail é obrigatório'),
  password: yup.string().min(6, 'Senha deve ter pelo menos 6 caracteres').required('Senha é obrigatória'),
  platform: yup.string().required('Selecione sua plataforma'),
  affiliateId: yup.string().required('ID de afiliado é obrigatório'),
});

type UserFormData = yup.InferType<typeof userSchema>;
type AffiliateFormData = yup.InferType<typeof affiliateSchema>;

const Login: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [userType, setUserType] = useState<UserType>('user');
  const [isValidatingAffiliate, setIsValidatingAffiliate] = useState(false);
  const [affiliateValidationStatus, setAffiliateValidationStatus] = useState<'none' | 'valid' | 'invalid'>('none');

  // Use separate forms for each user type to avoid TypeScript issues
  const userForm = useForm<UserFormData>({
    resolver: yupResolver(userSchema),
  });

  const affiliateForm = useForm<AffiliateFormData>({
    resolver: yupResolver(affiliateSchema),
  });

  // Get the current form based on user type
  const currentForm = userType === 'user' ? userForm : affiliateForm;
  const { register, handleSubmit, formState: { errors, isSubmitting }, setValue, watch } = currentForm;

  const watchedAffiliateId = userType === 'affiliate' ? (affiliateForm.watch('affiliateId') || '') : '';
  const watchedPlatform = userType === 'affiliate' ? (affiliateForm.watch('platform') || '') : '';

  // Validação de ID de afiliado em tempo real
  React.useEffect(() => {
    if (userType === 'affiliate' && watchedAffiliateId && watchedPlatform) {
      const validateAffiliateId = async () => {
        setIsValidatingAffiliate(true);
        setAffiliateValidationStatus('none');
        
        try {
          // Simulação de validação de API
          await new Promise(resolve => setTimeout(resolve, 1500));
          
          // Simulação: IDs que começam com 'test' são inválidos
          if (watchedAffiliateId.toLowerCase().startsWith('test')) {
            setAffiliateValidationStatus('invalid');
          } else {
            setAffiliateValidationStatus('valid');
          }
        } catch (error) {
          setAffiliateValidationStatus('invalid');
        } finally {
          setIsValidatingAffiliate(false);
        }
      };

      const timeoutId = setTimeout(validateAffiliateId, 800);
      return () => clearTimeout(timeoutId);
    }
  }, [watchedAffiliateId, watchedPlatform, userType]);

  const onSubmit = async (data: UserFormData | AffiliateFormData) => {
    try {
      if (userType === 'affiliate') {
        const affiliateData = data as AffiliateFormData;
        if (affiliateValidationStatus !== 'valid') {
          toast({
            title: "ID de afiliado inválido",
            description: "Verifique seu ID ou cadastre-se na plataforma parceira primeiro.",
            variant: "destructive",
          });
          return;
        }
        
        console.log('Login de afiliado:', affiliateData);
        toast({
          title: "Validando afiliado...",
          description: `Verificando credenciais na ${affiliateData.platform}`,
        });
      }

      await login(data.email, data.password);
      toast({
        title: "Login realizado com sucesso!",
        description: userType === 'affiliate' ? "Bem-vindo, afiliado!" : "Bem-vindo de volta!",
      });
      navigate('/feed');
    } catch (error) {
      console.error('Erro no login:', error);
      toast({
        title: "Erro no login",
        description: "Verifique suas credenciais e tente novamente.",
        variant: "destructive",
      });
    }
  };

  const handleSocialLogin = (provider: string) => {
    console.log(`Iniciando login com ${provider}`);
    toast({
      title: `Login com ${provider}`,
      description: "Funcionalidade em desenvolvimento. Em breve estará disponível!",
    });
  };

  const handleForgotPassword = () => {
    toast({
      title: "Recuperação de senha",
      description: "Funcionalidade em desenvolvimento. Entre em contato conosco!",
    });
  };

  const handleUserTypeChange = (newUserType: UserType) => {
    setUserType(newUserType);
    setAffiliateValidationStatus('none');
    // Reset both forms when switching
    userForm.reset();
    affiliateForm.reset();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-indigo-600/10"></div>
      
      <div className="relative max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="mx-auto h-16 w-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg">
            <LogIn className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">
            AffiliateNet
          </h1>
          <p className="text-slate-600 text-lg">Bem-vindo de volta!</p>
        </div>

        <Card className="border-0 shadow-2xl bg-white/80 backdrop-blur-sm">
          <CardHeader className="space-y-1 pb-6">
            <CardTitle className="text-2xl text-center font-bold text-slate-800">Fazer Login</CardTitle>
            <CardDescription className="text-center text-slate-600">
              Escolha seu tipo de acesso
            </CardDescription>
            
            {/* Seleção de Tipo de Usuário */}
            <div className="grid grid-cols-2 gap-3 mt-4">
              <Button
                type="button"
                variant={userType === 'user' ? 'default' : 'outline'}
                onClick={() => handleUserTypeChange('user')}
                className="h-12 flex items-center space-x-2"
              >
                <User className="h-4 w-4" />
                <span>Usuário</span>
              </Button>
              <Button
                type="button"
                variant={userType === 'affiliate' ? 'default' : 'outline'}
                onClick={() => handleUserTypeChange('affiliate')}
                className="h-12 flex items-center space-x-2"
              >
                <DollarSign className="h-4 w-4" />
                <span>Afiliado</span>
              </Button>
            </div>
          </CardHeader>
          
          <CardContent className="space-y-6">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-slate-700 font-medium">
                  {userType === 'affiliate' ? 'E-mail profissional' : 'E-mail'}
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
                  <Input
                    id="email"
                    type="email"
                    placeholder={userType === 'affiliate' ? 'seu@email.profissional.com' : 'seu@email.com'}
                    {...register('email')}
                    className={`pl-11 border-slate-200 focus:border-blue-500 focus:ring-blue-500 bg-white ${errors.email ? 'border-red-400 focus:border-red-500 focus:ring-red-500' : ''}`}
                  />
                </div>
                {errors.email && (
                  <p className="text-red-500 text-sm font-medium">{errors.email.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-slate-700 font-medium">Senha</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    {...register('password')}
                    className={`pl-11 pr-11 border-slate-200 focus:border-blue-500 focus:ring-blue-500 bg-white ${errors.password ? 'border-red-400 focus:border-red-500 focus:ring-red-500' : ''}`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-red-500 text-sm font-medium">{errors.password.message}</p>
                )}
              </div>

              {/* Campos específicos para afiliados */}
              {userType === 'affiliate' && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="platform" className="text-slate-700 font-medium">Plataforma de Afiliação</Label>
                    <Select onValueChange={(value) => affiliateForm.setValue('platform', value)}>
                      <SelectTrigger className="border-slate-200 focus:border-blue-500 focus:ring-blue-500 bg-white">
                        <SelectValue placeholder="Selecione sua plataforma" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="amazon">Amazon Associates</SelectItem>
                        <SelectItem value="shopee">Shopee Affiliate</SelectItem>
                        <SelectItem value="mercadolivre">Mercado Livre</SelectItem>
                        <SelectItem value="magazineluiza">Magazine Luiza</SelectItem>
                        <SelectItem value="shein">Shein Affiliate</SelectItem>
                      </SelectContent>
                    </Select>
                    {(affiliateForm.formState.errors as any).platform && (
                      <p className="text-red-500 text-sm font-medium">{(affiliateForm.formState.errors as any).platform.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="affiliateId" className="text-slate-700 font-medium">ID de Afiliado</Label>
                    <div className="relative">
                      <Input
                        id="affiliateId"
                        type="text"
                        placeholder="Seu ID de afiliado"
                        {...affiliateForm.register('affiliateId')}
                        className={`pr-11 border-slate-200 focus:border-blue-500 focus:ring-blue-500 bg-white ${(affiliateForm.formState.errors as any).affiliateId ? 'border-red-400 focus:border-red-500 focus:ring-red-500' : ''}`}
                      />
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                        {isValidatingAffiliate && (
                          <div className="animate-spin h-4 w-4 border-2 border-blue-500 border-t-transparent rounded-full"></div>
                        )}
                        {!isValidatingAffiliate && affiliateValidationStatus === 'valid' && (
                          <CheckCircle className="h-4 w-4 text-green-500" />
                        )}
                        {!isValidatingAffiliate && affiliateValidationStatus === 'invalid' && (
                          <AlertCircle className="h-4 w-4 text-red-500" />
                        )}
                      </div>
                    </div>
                    {(affiliateForm.formState.errors as any).affiliateId && (
                      <p className="text-red-500 text-sm font-medium">{(affiliateForm.formState.errors as any).affiliateId.message}</p>
                    )}
                    {affiliateValidationStatus === 'valid' && (
                      <p className="text-green-600 text-sm font-medium">✅ ID de afiliado válido</p>
                    )}
                    {affiliateValidationStatus === 'invalid' && (
                      <p className="text-red-500 text-sm font-medium">❌ ID não encontrado. Verifique ou cadastre-se na plataforma parceira primeiro.</p>
                    )}
                  </div>
                </>
              )}

              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={handleForgotPassword}
                  className="text-sm text-blue-600 hover:text-blue-800 font-medium transition-colors"
                >
                  Esqueci a senha
                </button>
              </div>

              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-3 px-4 rounded-lg shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5"
                disabled={isSubmitting || (userType === 'affiliate' && affiliateValidationStatus !== 'valid')}
              >
                {isSubmitting ? 'Entrando...' : 'Entrar'}
              </Button>
            </form>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-slate-200" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-3 text-slate-500 font-medium">
                  Ou continue com
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Button 
                type="button"
                variant="outline" 
                onClick={() => handleSocialLogin('Google')}
                className="w-full border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300 font-medium py-3 transition-all"
              >
                Google
              </Button>
              <Button 
                type="button"
                variant="outline" 
                onClick={() => handleSocialLogin('Facebook')}
                className="w-full border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300 font-medium py-3 transition-all"
              >
                Facebook
              </Button>
            </div>

            <div className="text-center pt-4">
              <span className="text-sm text-slate-600">
                Não tem uma conta?{' '}
                <Link to="/register" className="text-blue-600 hover:text-blue-800 font-semibold transition-colors">
                  Cadastre-se
                </Link>
              </span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;
