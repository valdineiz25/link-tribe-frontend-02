
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
import { UserPlus, Eye, EyeOff, User, DollarSign, CheckCircle, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

type UserType = 'user' | 'affiliate';

const userSchema = yup.object({
  name: yup.string().required('Nome é obrigatório'),
  email: yup.string().email('E-mail inválido').required('E-mail é obrigatório'),
  cpf: yup.string()
    .matches(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, 'CPF deve ter o formato 000.000.000-00')
    .required('CPF é obrigatório'),
  phone: yup.string()
    .matches(/^\(\d{2}\) \d{5}-\d{4}$/, 'Telefone deve ter o formato (00) 00000-0000')
    .required('Telefone é obrigatório'),
  state: yup.string().required('Estado é obrigatório'),
  city: yup.string().required('Cidade é obrigatória'),
  password: yup.string()
    .min(6, 'Senha deve ter pelo menos 6 caracteres')
    .required('Senha é obrigatória'),
  confirmPassword: yup.string()
    .oneOf([yup.ref('password')], 'Senhas devem ser iguais')
    .required('Confirmação de senha é obrigatória'),
});

const affiliateSchema = yup.object({
  name: yup.string().required('Nome é obrigatório'),
  email: yup.string().email('E-mail inválido').required('E-mail é obrigatório'),
  cpf: yup.string()
    .matches(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, 'CPF deve ter o formato 000.000.000-00')
    .required('CPF é obrigatório'),
  phone: yup.string()
    .matches(/^\(\d{2}\) \d{5}-\d{4}$/, 'Telefone deve ter o formato (00) 00000-0000')
    .required('Telefone é obrigatório'),
  state: yup.string().required('Estado é obrigatório'),
  city: yup.string().required('Cidade é obrigatória'),
  platform: yup.string().required('Selecione sua plataforma'),
  affiliateId: yup.string().required('ID de afiliado é obrigatório'),
  password: yup.string()
    .min(6, 'Senha deve ter pelo menos 6 caracteres')
    .required('Senha é obrigatória'),
  confirmPassword: yup.string()
    .oneOf([yup.ref('password')], 'Senhas devem ser iguais')
    .required('Confirmação de senha é obrigatória'),
});

type UserFormData = yup.InferType<typeof userSchema>;
type AffiliateFormData = yup.InferType<typeof affiliateSchema>;

const Register: React.FC = () => {
  const { register: registerUser } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [userType, setUserType] = useState<UserType>('user');
  const [isValidatingAffiliate, setIsValidatingAffiliate] = useState(false);
  const [affiliateValidationStatus, setAffiliateValidationStatus] = useState<'none' | 'valid' | 'invalid'>('none');

  // Use separate forms for each user type
  const userForm = useForm<UserFormData>({
    resolver: yupResolver(userSchema),
  });

  const affiliateForm = useForm<AffiliateFormData>({
    resolver: yupResolver(affiliateSchema),
  });

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

  const formatCPF = (value: string) => {
    const cleanValue = value.replace(/\D/g, '');
    return cleanValue
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})/, '$1-$2')
      .replace(/(-\d{2})\d+?$/, '$1');
  };

  const formatPhone = (value: string) => {
    const cleanValue = value.replace(/\D/g, '');
    return cleanValue
      .replace(/(\d{2})(\d)/, '($1) $2')
      .replace(/(\d{5})(\d)/, '$1-$2')
      .replace(/(-\d{4})\d+?$/, '$1');
  };

  const handleCPFChange = (e: React.ChangeEvent<HTMLInputElement>, form: any) => {
    const formatted = formatCPF(e.target.value);
    form.setValue('cpf', formatted);
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>, form: any) => {
    const formatted = formatPhone(e.target.value);
    form.setValue('phone', formatted);
  };

  const onUserSubmit = async (data: UserFormData) => {
    try {
      console.log('Cadastro de usuário:', data);
      await registerUser({
        name: data.name,
        email: data.email,
        cpf: data.cpf,
        phone: data.phone,
        state: data.state,
        city: data.city,
        password: data.password,
      });
      toast({
        title: "Conta criada com sucesso!",
        description: "Bem-vindo ao AffiliateNet!",
      });
      navigate('/feed');
    } catch (error) {
      console.error('Erro no cadastro:', error);
      toast({
        title: "Erro no cadastro",
        description: "Verifique os dados e tente novamente.",
        variant: "destructive",
      });
    }
  };

  const onAffiliateSubmit = async (data: AffiliateFormData) => {
    try {
      if (affiliateValidationStatus !== 'valid') {
        toast({
          title: "ID de afiliado inválido",
          description: "Verifique seu ID ou cadastre-se na plataforma parceira primeiro.",
          variant: "destructive",
        });
        return;
      }

      console.log('Cadastro de afiliado:', data);
      await registerUser({
        name: data.name,
        email: data.email,
        cpf: data.cpf,
        phone: data.phone,
        state: data.state,
        city: data.city,
        password: data.password,
      });
      toast({
        title: "Conta criada com sucesso!",
        description: "Bem-vindo, afiliado!",
      });
      navigate('/feed');
    } catch (error) {
      console.error('Erro no cadastro:', error);
      toast({
        title: "Erro no cadastro",
        description: "Verifique os dados e tente novamente.",
        variant: "destructive",
      });
    }
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
            <UserPlus className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">
            AffiliateNet
          </h1>
          <p className="text-slate-600 text-lg">Crie sua conta</p>
        </div>

        <Card className="border-0 shadow-2xl bg-white/80 backdrop-blur-sm">
          <CardHeader className="space-y-1 pb-6">
            <CardTitle className="text-2xl text-center font-bold text-slate-800">Cadastro</CardTitle>
            <CardDescription className="text-center text-slate-600">
              Escolha seu tipo de conta
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
          
          <CardContent>
            {userType === 'user' ? (
              <form onSubmit={userForm.handleSubmit(onUserSubmit)} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-slate-700 font-medium">Nome Completo</Label>
                  <Input
                    id="name"
                    placeholder="Seu nome completo"
                    {...userForm.register('name')}
                    className={`border-slate-200 focus:border-blue-500 focus:ring-blue-500 ${userForm.formState.errors.name ? 'border-red-500' : ''}`}
                  />
                  {userForm.formState.errors.name && (
                    <p className="text-red-500 text-sm">{userForm.formState.errors.name.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-slate-700 font-medium">E-mail</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="seu@email.com"
                    {...userForm.register('email')}
                    className={`border-slate-200 focus:border-blue-500 focus:ring-blue-500 ${userForm.formState.errors.email ? 'border-red-500' : ''}`}
                  />
                  {userForm.formState.errors.email && (
                    <p className="text-red-500 text-sm">{userForm.formState.errors.email.message}</p>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="cpf" className="text-slate-700 font-medium">CPF</Label>
                    <Input
                      id="cpf"
                      placeholder="000.000.000-00"
                      {...userForm.register('cpf')}
                      onChange={(e) => handleCPFChange(e, userForm)}
                      maxLength={14}
                      className={`border-slate-200 focus:border-blue-500 focus:ring-blue-500 ${userForm.formState.errors.cpf ? 'border-red-500' : ''}`}
                    />
                    {userForm.formState.errors.cpf && (
                      <p className="text-red-500 text-sm">{userForm.formState.errors.cpf.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-slate-700 font-medium">Telefone</Label>
                    <Input
                      id="phone"
                      placeholder="(00) 00000-0000"
                      {...userForm.register('phone')}
                      onChange={(e) => handlePhoneChange(e, userForm)}
                      maxLength={15}
                      className={`border-slate-200 focus:border-blue-500 focus:ring-blue-500 ${userForm.formState.errors.phone ? 'border-red-500' : ''}`}
                    />
                    {userForm.formState.errors.phone && (
                      <p className="text-red-500 text-sm">{userForm.formState.errors.phone.message}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="state" className="text-slate-700 font-medium">Estado</Label>
                    <Input
                      id="state"
                      placeholder="SP"
                      {...userForm.register('state')}
                      className={`border-slate-200 focus:border-blue-500 focus:ring-blue-500 ${userForm.formState.errors.state ? 'border-red-500' : ''}`}
                    />
                    {userForm.formState.errors.state && (
                      <p className="text-red-500 text-sm">{userForm.formState.errors.state.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="city" className="text-slate-700 font-medium">Cidade</Label>
                    <Input
                      id="city"
                      placeholder="São Paulo"
                      {...userForm.register('city')}
                      className={`border-slate-200 focus:border-blue-500 focus:ring-blue-500 ${userForm.formState.errors.city ? 'border-red-500' : ''}`}
                    />
                    {userForm.formState.errors.city && (
                      <p className="text-red-500 text-sm">{userForm.formState.errors.city.message}</p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-slate-700 font-medium">Senha</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="••••••••"
                      {...userForm.register('password')}
                      className={`pr-11 border-slate-200 focus:border-blue-500 focus:ring-blue-500 ${userForm.formState.errors.password ? 'border-red-500' : ''}`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                    >
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                  {userForm.formState.errors.password && (
                    <p className="text-red-500 text-sm">{userForm.formState.errors.password.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="text-slate-700 font-medium">Confirmar Senha</Label>
                  <div className="relative">
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? 'text' : 'password'}
                      placeholder="••••••••"
                      {...userForm.register('confirmPassword')}
                      className={`pr-11 border-slate-200 focus:border-blue-500 focus:ring-blue-500 ${userForm.formState.errors.confirmPassword ? 'border-red-500' : ''}`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                    >
                      {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                  {userForm.formState.errors.confirmPassword && (
                    <p className="text-red-500 text-sm">{userForm.formState.errors.confirmPassword.message}</p>
                  )}
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-3 px-4 rounded-lg shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5" 
                  disabled={userForm.formState.isSubmitting}
                >
                  {userForm.formState.isSubmitting ? 'Criando conta...' : 'Criar Conta'}
                </Button>
              </form>
            ) : (
              <form onSubmit={affiliateForm.handleSubmit(onAffiliateSubmit)} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-slate-700 font-medium">Nome Completo</Label>
                  <Input
                    id="name"
                    placeholder="Seu nome completo"
                    {...affiliateForm.register('name')}
                    className={`border-slate-200 focus:border-blue-500 focus:ring-blue-500 ${affiliateForm.formState.errors.name ? 'border-red-500' : ''}`}
                  />
                  {affiliateForm.formState.errors.name && (
                    <p className="text-red-500 text-sm">{affiliateForm.formState.errors.name.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-slate-700 font-medium">E-mail profissional</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="seu@email.profissional.com"
                    {...affiliateForm.register('email')}
                    className={`border-slate-200 focus:border-blue-500 focus:ring-blue-500 ${affiliateForm.formState.errors.email ? 'border-red-500' : ''}`}
                  />
                  {affiliateForm.formState.errors.email && (
                    <p className="text-red-500 text-sm">{affiliateForm.formState.errors.email.message}</p>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="cpf" className="text-slate-700 font-medium">CPF</Label>
                    <Input
                      id="cpf"
                      placeholder="000.000.000-00"
                      {...affiliateForm.register('cpf')}
                      onChange={(e) => handleCPFChange(e, affiliateForm)}
                      maxLength={14}
                      className={`border-slate-200 focus:border-blue-500 focus:ring-blue-500 ${affiliateForm.formState.errors.cpf ? 'border-red-500' : ''}`}
                    />
                    {affiliateForm.formState.errors.cpf && (
                      <p className="text-red-500 text-sm">{affiliateForm.formState.errors.cpf.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-slate-700 font-medium">Telefone</Label>
                    <Input
                      id="phone"
                      placeholder="(00) 00000-0000"
                      {...affiliateForm.register('phone')}
                      onChange={(e) => handlePhoneChange(e, affiliateForm)}
                      maxLength={15}
                      className={`border-slate-200 focus:border-blue-500 focus:ring-blue-500 ${affiliateForm.formState.errors.phone ? 'border-red-500' : ''}`}
                    />
                    {affiliateForm.formState.errors.phone && (
                      <p className="text-red-500 text-sm">{affiliateForm.formState.errors.phone.message}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="state" className="text-slate-700 font-medium">Estado</Label>
                    <Input
                      id="state"
                      placeholder="SP"
                      {...affiliateForm.register('state')}
                      className={`border-slate-200 focus:border-blue-500 focus:ring-blue-500 ${affiliateForm.formState.errors.state ? 'border-red-500' : ''}`}
                    />
                    {affiliateForm.formState.errors.state && (
                      <p className="text-red-500 text-sm">{affiliateForm.formState.errors.state.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="city" className="text-slate-700 font-medium">Cidade</Label>
                    <Input
                      id="city"
                      placeholder="São Paulo"
                      {...affiliateForm.register('city')}
                      className={`border-slate-200 focus:border-blue-500 focus:ring-blue-500 ${affiliateForm.formState.errors.city ? 'border-red-500' : ''}`}
                    />
                    {affiliateForm.formState.errors.city && (
                      <p className="text-red-500 text-sm">{affiliateForm.formState.errors.city.message}</p>
                    )}
                  </div>
                </div>

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
                  {affiliateForm.formState.errors.platform && (
                    <p className="text-red-500 text-sm">{affiliateForm.formState.errors.platform.message}</p>
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
                      className={`pr-11 border-slate-200 focus:border-blue-500 focus:ring-blue-500 bg-white ${affiliateForm.formState.errors.affiliateId ? 'border-red-400 focus:border-red-500 focus:ring-red-500' : ''}`}
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
                  {affiliateForm.formState.errors.affiliateId && (
                    <p className="text-red-500 text-sm font-medium">{affiliateForm.formState.errors.affiliateId.message}</p>
                  )}
                  {affiliateValidationStatus === 'valid' && (
                    <p className="text-green-600 text-sm font-medium">✅ ID de afiliado válido</p>
                  )}
                  {affiliateValidationStatus === 'invalid' && (
                    <p className="text-red-500 text-sm font-medium">❌ ID não encontrado. Verifique ou cadastre-se na plataforma parceira primeiro.</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-slate-700 font-medium">Senha</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="••••••••"
                      {...affiliateForm.register('password')}
                      className={`pr-11 border-slate-200 focus:border-blue-500 focus:ring-blue-500 ${affiliateForm.formState.errors.password ? 'border-red-500' : ''}`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                    >
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                  {affiliateForm.formState.errors.password && (
                    <p className="text-red-500 text-sm">{affiliateForm.formState.errors.password.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="text-slate-700 font-medium">Confirmar Senha</Label>
                  <div className="relative">
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? 'text' : 'password'}
                      placeholder="••••••••"
                      {...affiliateForm.register('confirmPassword')}
                      className={`pr-11 border-slate-200 focus:border-blue-500 focus:ring-blue-500 ${affiliateForm.formState.errors.confirmPassword ? 'border-red-500' : ''}`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                    >
                      {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                  {affiliateForm.formState.errors.confirmPassword && (
                    <p className="text-red-500 text-sm">{affiliateForm.formState.errors.confirmPassword.message}</p>
                  )}
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-3 px-4 rounded-lg shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5"
                  disabled={affiliateForm.formState.isSubmitting || affiliateValidationStatus !== 'valid'}
                >
                  {affiliateForm.formState.isSubmitting ? 'Criando conta...' : 'Criar Conta'}
                </Button>
              </form>
            )}

            <div className="text-center mt-6">
              <span className="text-sm text-slate-600">
                Já tem uma conta?{' '}
                <Link to="/login" className="text-blue-600 hover:text-blue-800 font-semibold transition-colors">
                  Faça login
                </Link>
              </span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Register;
