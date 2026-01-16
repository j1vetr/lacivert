import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Phone, Mail, Send } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { SEO } from "@/components/SEO";
import { useTranslation } from "react-i18next";

const formSchema = z.object({
  name: z.string().min(2, "İsim en az 2 karakter olmalıdır."),
  email: z.string().email("Geçerli bir e-posta adresi giriniz."),
  phone: z.string().min(10, "Geçerli bir telefon numarası giriniz."),
  subject: z.string().min(2, "Konu başlığı gereklidir."),
  message: z.string().min(10, "Mesajınız en az 10 karakter olmalıdır."),
});

export default function Contact() {
  const { toast } = useToast();
  const { t } = useTranslation();
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    toast({
      title: t('contact.toast_title'),
      description: t('contact.toast_desc'),
    });
    form.reset();
  }

  return (
    <div className="min-h-screen bg-background font-sans text-foreground selection:bg-blue-500/30">
      <SEO 
        title={t('contact.title')} 
        description={t('contact.desc')} 
      />
      {/* Header */}
      <section className="bg-slate-900 text-white pt-[9.5rem] pb-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-6">{t('contact.hero_title')}</h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            {t('contact.hero_desc')}
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Info */}
            <div className="lg:col-span-1 space-y-8">
              <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-sm dark:shadow-none border border-slate-200 dark:border-slate-800">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-8">{t('contact.info_title')}</h2>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-accent/10 p-3 rounded-lg shrink-0">
                      <MapPin className="w-6 h-6 text-accent" />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 dark:text-white mb-1">{t('contact.address_title')}</h3>
                      <p className="text-slate-600 dark:text-slate-400">
                        Gürsel Mah. İmrahor Cad. Premier Kampüs Ofis No: 29/A Kat:6 Ofis:217 <br/> Kağıthane / İstanbul
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="bg-accent/10 p-3 rounded-lg shrink-0">
                      <Phone className="w-6 h-6 text-accent" />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 dark:text-white mb-1">{t('contact.phone_title')}</h3>
                      <p className="text-slate-600 dark:text-slate-400">0 535 024 69 77</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="bg-accent/10 p-3 rounded-lg shrink-0">
                      <Mail className="w-6 h-6 text-accent" />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 dark:text-white mb-1">{t('contact.email_title')}</h3>
                      <p className="text-slate-600 dark:text-slate-400">info@lacivertteknoloji.com</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Google Map Embed */}
              <div className="rounded-2xl overflow-hidden h-64 w-full shadow-sm border border-slate-200 dark:border-slate-800">
                <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d387587.22600174503!2d28.68269274443944!3d40.62932615174701!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x409fe0002530ff91%3A0xa03f962ca8048551!2sLacivert%20Teknoloji!5e0!3m2!1str!2str!4v1763801124174!5m2!1str!2str" 
                    width="100%" 
                    height="100%" 
                    style={{ border: 0 }} 
                    allowFullScreen={true} 
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-2">
              <Card className="border-slate-200 dark:border-slate-800 shadow-sm dark:shadow-none bg-white dark:bg-slate-900">
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">{t('contact.form_title')}</h2>
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-slate-900 dark:text-white">{t('contact.form_name')}</FormLabel>
                              <FormControl>
                                <Input placeholder={t('contact.form_name_ph')} className="h-12 bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700" {...field} />
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
                              <FormLabel className="text-slate-900 dark:text-white">{t('contact.form_phone')}</FormLabel>
                              <FormControl>
                                <Input placeholder={t('contact.form_phone_ph')} className="h-12 bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700" {...field} />
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
                              <FormLabel className="text-slate-900 dark:text-white">{t('contact.form_email')}</FormLabel>
                              <FormControl>
                                <Input placeholder={t('contact.form_email_ph')} className="h-12 bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="subject"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-slate-900 dark:text-white">{t('contact.form_subject')}</FormLabel>
                              <FormControl>
                                <Input placeholder={t('contact.form_subject_ph')} className="h-12 bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700" {...field} />
                              </FormControl>
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
                            <FormLabel className="text-slate-900 dark:text-white">{t('contact.form_message')}</FormLabel>
                            <FormControl>
                              <Textarea placeholder={t('contact.form_message_ph')} className="min-h-[150px] bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 resize-none" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <Button type="submit" size="lg" className="w-full md:w-auto px-8 h-12 bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-200 font-bold">
                        <Send className="w-4 h-4 mr-2" />
                        {t('contact.btn_send')}
                      </Button>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
