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

const formSchema = z.object({
  name: z.string().min(2, "İsim en az 2 karakter olmalıdır."),
  email: z.string().email("Geçerli bir e-posta adresi giriniz."),
  phone: z.string().min(10, "Geçerli bir telefon numarası giriniz."),
  subject: z.string().min(2, "Konu başlığı gereklidir."),
  message: z.string().min(10, "Mesajınız en az 10 karakter olmalıdır."),
});

export default function Contact() {
  const { toast } = useToast();
  
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
      title: "Mesajınız Gönderildi",
      description: "En kısa sürede sizinle iletişime geçeceğiz.",
    });
    form.reset();
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <section className="bg-primary text-white pt-32 pb-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-6">İletişim</h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            Sorularınız, projeleriniz ve teklif talepleriniz için bizimle iletişime geçin.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Info */}
            <div className="lg:col-span-1 space-y-8">
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-border">
                <h2 className="text-2xl font-bold text-primary mb-8">İletişim Bilgileri</h2>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-accent/10 p-3 rounded-lg shrink-0">
                      <MapPin className="w-6 h-6 text-accent" />
                    </div>
                    <div>
                      <h3 className="font-bold text-primary mb-1">Adres</h3>
                      <p className="text-muted-foreground">
                        Gürsel Mah. İmrahor Cad. Premier Kampüs Ofis No: 29/A Kat:6 Ofis:217 <br/> Kağıthane / İstanbul
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="bg-accent/10 p-3 rounded-lg shrink-0">
                      <Phone className="w-6 h-6 text-accent" />
                    </div>
                    <div>
                      <h3 className="font-bold text-primary mb-1">Telefon</h3>
                      <p className="text-muted-foreground">0532 503 34 17</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="bg-accent/10 p-3 rounded-lg shrink-0">
                      <Mail className="w-6 h-6 text-accent" />
                    </div>
                    <div>
                      <h3 className="font-bold text-primary mb-1">E-posta</h3>
                      <p className="text-muted-foreground">info@lacivertteknoloji.com</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Map could go here if we had an embed code, placeholder for now */}
              <div className="bg-slate-200 rounded-2xl h-64 w-full flex items-center justify-center text-slate-400">
                <MapPin className="w-12 h-12 opacity-20" />
                <span className="ml-2 opacity-50">Harita Alanı</span>
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-2">
              <Card className="border-border shadow-sm">
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold text-primary mb-6">Hızlı İletişim Formu</h2>
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Ad Soyad</FormLabel>
                              <FormControl>
                                <Input placeholder="Adınız Soyadınız" className="h-12 bg-slate-50" {...field} />
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
                              <FormLabel>Telefon</FormLabel>
                              <FormControl>
                                <Input placeholder="05XX XXX XX XX" className="h-12 bg-slate-50" {...field} />
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
                              <FormLabel>E-posta</FormLabel>
                              <FormControl>
                                <Input placeholder="ornek@sirket.com" className="h-12 bg-slate-50" {...field} />
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
                              <FormLabel>Konu</FormLabel>
                              <FormControl>
                                <Input placeholder="Mesajınızın konusu" className="h-12 bg-slate-50" {...field} />
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
                            <FormLabel>Mesajınız</FormLabel>
                            <FormControl>
                              <Textarea placeholder="Talebinizi detaylı olarak yazınız..." className="min-h-[150px] bg-slate-50 resize-none" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <Button type="submit" size="lg" className="w-full md:w-auto px-8 h-12 bg-primary hover:bg-primary/90">
                        <Send className="w-4 h-4 mr-2" />
                        Mesajı Gönder
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
