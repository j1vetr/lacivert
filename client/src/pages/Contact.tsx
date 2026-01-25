import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Phone, Mail, Send, Building2, Loader2, CheckCircle2, Ship, Satellite, Shield, Wifi } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { SEO } from "@/components/SEO";
import { useTranslation } from "react-i18next";

const formSchema = z.object({
  name: z.string().min(2, "İsim en az 2 karakter olmalıdır."),
  company: z.string().optional(),
  email: z.string().email("Geçerli bir e-posta adresi giriniz."),
  phone: z.string().optional(),
  subject: z.string().min(1, "Lütfen bir konu seçiniz."),
  service: z.string().optional(),
  message: z.string().min(10, "Mesajınız en az 10 karakter olmalıdır."),
});

export default function Contact() {
  const { toast } = useToast();
  const { t } = useTranslation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const services = [
    { value: "starlink", label: t('contact.service_starlink'), icon: Satellite },
    { value: "oneweb", label: t('contact.service_oneweb'), icon: Satellite },
    { value: "iridium", label: t('contact.service_iridium'), icon: Satellite },
    { value: "peplink", label: t('contact.service_peplink'), icon: Wifi },
    { value: "teltonika", label: t('contact.service_teltonika'), icon: Wifi },
    { value: "it", label: t('contact.service_it'), icon: Building2 },
    { value: "security", label: t('contact.service_security'), icon: Shield },
    { value: "other", label: t('contact.service_other'), icon: Ship },
  ];

  const subjects = [
    { value: "quote", label: t('contact.subject_quote') },
    { value: "info", label: t('contact.subject_info') },
    { value: "support", label: t('contact.subject_support') },
    { value: "partnership", label: t('contact.subject_partnership') },
    { value: "other", label: t('contact.subject_other') },
  ];
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      company: "",
      email: "",
      phone: "",
      subject: "",
      service: "",
      message: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    try {
      const subjectLabel = subjects.find(s => s.value === values.subject)?.label || values.subject;
      const serviceLabel = services.find(s => s.value === values.service)?.label || "";
      
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: values.name,
          email: values.email,
          phone: values.phone || "",
          subject: `${subjectLabel}${serviceLabel ? ` - ${serviceLabel}` : ""}${values.company ? ` (${values.company})` : ""}`,
          message: values.message,
        }),
      });

      if (!response.ok) {
        throw new Error("Gönderim başarısız");
      }

      setIsSuccess(true);
      toast({
        title: t('contact.toast_title'),
        description: t('contact.toast_desc'),
      });
      form.reset();
      
      setTimeout(() => setIsSuccess(false), 5000);
    } catch (error) {
      toast({
        title: t('contact.toast_error_title'),
        description: t('contact.toast_error_desc'),
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-background font-sans text-foreground selection:bg-blue-500/30">
      <SEO 
        title={t('contact.title')} 
        description={t('contact.desc')} 
      />
      
      <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white pt-38 pb-24 overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-50"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-sm text-blue-300 mb-6">
            <Mail className="w-4 h-4" />
            <span>{t('contact.hero_badge')}</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-6">
            {t('contact.hero_title')}
          </h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
            {t('contact.hero_desc')}
          </p>
        </div>
      </section>

      <section className="py-20 bg-slate-950">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            
            <div className="lg:col-span-1 space-y-6">
              <Card className="border-slate-800 bg-slate-900/50 backdrop-blur-sm overflow-hidden">
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold text-white mb-8">{t('contact.info_title')}</h2>
                  
                  <div className="space-y-6">
                    <a href="https://maps.google.com/?q=Lacivert+Teknoloji" target="_blank" rel="noopener noreferrer" className="flex items-start gap-4 group" data-testid="link-address">
                      <div className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 p-3 rounded-xl shrink-0 group-hover:from-blue-500/30 group-hover:to-cyan-500/30 transition-all">
                        <MapPin className="w-6 h-6 text-blue-400" />
                      </div>
                      <div>
                        <h3 className="font-bold text-white mb-1">{t('contact.address_title')}</h3>
                        <p className="text-slate-400 text-sm leading-relaxed group-hover:text-slate-300 transition-colors">
                          Gürsel Mah. İmrahor Cad. Premier Kampüs Ofis No: 29/A Kat:6 Ofis:217, Kağıthane / İstanbul
                        </p>
                      </div>
                    </a>

                    <a href="tel:+905350246977" className="flex items-start gap-4 group" data-testid="link-phone">
                      <div className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 p-3 rounded-xl shrink-0 group-hover:from-green-500/30 group-hover:to-emerald-500/30 transition-all">
                        <Phone className="w-6 h-6 text-green-400" />
                      </div>
                      <div>
                        <h3 className="font-bold text-white mb-1">{t('contact.phone_title')}</h3>
                        <p className="text-slate-400 group-hover:text-slate-300 transition-colors">0 535 024 69 77</p>
                      </div>
                    </a>

                    <a href="mailto:info@lacivertteknoloji.com" className="flex items-start gap-4 group" data-testid="link-email">
                      <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 p-3 rounded-xl shrink-0 group-hover:from-purple-500/30 group-hover:to-pink-500/30 transition-all">
                        <Mail className="w-6 h-6 text-purple-400" />
                      </div>
                      <div>
                        <h3 className="font-bold text-white mb-1">{t('contact.email_title')}</h3>
                        <p className="text-slate-400 group-hover:text-slate-300 transition-colors">info@lacivertteknoloji.com</p>
                      </div>
                    </a>
                  </div>
                </CardContent>
              </Card>
              
              <div className="rounded-2xl overflow-hidden h-64 w-full border border-slate-800">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d387587.22600174503!2d28.68269274443944!3d40.62932615174701!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x409fe0002530ff91%3A0xa03f962ca8048551!2sLacivert%20Teknoloji!5e0!3m2!1str!2str!4v1763801124174!5m2!1str!2str" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen={true} 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Lacivert Teknoloji Konum"
                ></iframe>
              </div>

              <Card className="border-slate-800 bg-gradient-to-br from-blue-900/30 to-cyan-900/30 overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <Ship className="w-6 h-6 text-cyan-400" />
                    <h3 className="font-bold text-white">{t('contact.maritime_card_title')}</h3>
                  </div>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    {t('contact.maritime_card_desc')}
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="lg:col-span-2">
              <Card className="border-slate-800 bg-slate-900/50 backdrop-blur-sm overflow-hidden">
                <CardContent className="p-8 md:p-10">
                  {isSuccess ? (
                    <div className="text-center py-12">
                      <div className="w-20 h-20 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle2 className="w-10 h-10 text-green-400" />
                      </div>
                      <h2 className="text-2xl font-bold text-white mb-3">{t('contact.success_title')}</h2>
                      <p className="text-slate-400 max-w-md mx-auto">
                        {t('contact.success_desc')}
                      </p>
                    </div>
                  ) : (
                    <>
                      <div className="mb-8">
                        <h2 className="text-2xl font-bold text-white mb-2">{t('contact.form_title')}</h2>
                        <p className="text-slate-400">{t('contact.form_subtitle')}</p>
                      </div>
                      
                      <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6" data-testid="form-contact">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <FormField
                              control={form.control}
                              name="name"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="text-white">{t('contact.form_name')} *</FormLabel>
                                  <FormControl>
                                    <Input 
                                      placeholder={t('contact.form_name_ph')} 
                                      className="h-12 bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-500 focus:border-blue-500 focus:ring-blue-500/20" 
                                      data-testid="input-name"
                                      {...field} 
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={form.control}
                              name="company"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="text-white">{t('contact.form_company')}</FormLabel>
                                  <FormControl>
                                    <Input 
                                      placeholder={t('contact.form_company_ph')} 
                                      className="h-12 bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-500 focus:border-blue-500 focus:ring-blue-500/20" 
                                      data-testid="input-company"
                                      {...field} 
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <FormField
                              control={form.control}
                              name="email"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="text-white">{t('contact.form_email')} *</FormLabel>
                                  <FormControl>
                                    <Input 
                                      type="email"
                                      placeholder={t('contact.form_email_ph')} 
                                      className="h-12 bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-500 focus:border-blue-500 focus:ring-blue-500/20" 
                                      data-testid="input-email"
                                      {...field} 
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={form.control}
                              name="phone"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="text-white">{t('contact.form_phone')}</FormLabel>
                                  <FormControl>
                                    <Input 
                                      placeholder={t('contact.form_phone_ph')} 
                                      className="h-12 bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-500 focus:border-blue-500 focus:ring-blue-500/20" 
                                      data-testid="input-phone"
                                      {...field} 
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <FormField
                              control={form.control}
                              name="subject"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="text-white">{t('contact.form_subject')} *</FormLabel>
                                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                      <SelectTrigger className="h-12 bg-slate-800/50 border-slate-700 text-white focus:border-blue-500 focus:ring-blue-500/20" data-testid="select-subject">
                                        <SelectValue placeholder={t('contact.form_subject_ph')} />
                                      </SelectTrigger>
                                    </FormControl>
                                    <SelectContent className="bg-slate-800 border-slate-700">
                                      {subjects.map((subject) => (
                                        <SelectItem 
                                          key={subject.value} 
                                          value={subject.value}
                                          className="text-white hover:bg-slate-700 focus:bg-slate-700"
                                        >
                                          {subject.label}
                                        </SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={form.control}
                              name="service"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="text-white">{t('contact.form_service')}</FormLabel>
                                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                      <SelectTrigger className="h-12 bg-slate-800/50 border-slate-700 text-white focus:border-blue-500 focus:ring-blue-500/20" data-testid="select-service">
                                        <SelectValue placeholder={t('contact.form_service_ph')} />
                                      </SelectTrigger>
                                    </FormControl>
                                    <SelectContent className="bg-slate-800 border-slate-700">
                                      {services.map((service) => (
                                        <SelectItem 
                                          key={service.value} 
                                          value={service.value}
                                          className="text-white hover:bg-slate-700 focus:bg-slate-700"
                                        >
                                          <div className="flex items-center gap-2">
                                            <service.icon className="w-4 h-4 text-blue-400" />
                                            {service.label}
                                          </div>
                                        </SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>

                          <FormField
                            control={form.control}
                            name="message"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-white">{t('contact.form_message')} *</FormLabel>
                                <FormControl>
                                  <Textarea 
                                    placeholder={t('contact.form_message_ph')} 
                                    className="min-h-[150px] bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-500 focus:border-blue-500 focus:ring-blue-500/20 resize-none" 
                                    data-testid="textarea-message"
                                    {...field} 
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between pt-4">
                            <p className="text-slate-500 text-sm">{t('contact.required_fields')}</p>
                            <Button 
                              type="submit" 
                              size="lg" 
                              disabled={isSubmitting}
                              className="w-full sm:w-auto px-8 h-12 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-bold shadow-lg shadow-blue-500/25 transition-all"
                              data-testid="button-submit"
                            >
                              {isSubmitting ? (
                                <>
                                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                  {t('contact.btn_sending')}
                                </>
                              ) : (
                                <>
                                  <Send className="w-4 h-4 mr-2" />
                                  {t('contact.btn_send')}
                                </>
                              )}
                            </Button>
                          </div>
                        </form>
                      </Form>
                    </>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
