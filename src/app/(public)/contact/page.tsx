import ContactForm from '@/features/contact/components/ContactForm';
import Menu from '@/features/contact/components/Menu';

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-2xl space-y-6 px-6">
      <Menu />
      <ContactForm />
    </div>
  );
}
