import { AdminTitle } from '@/components/AdminTitle';
import { getContacts } from '@/features/contact/actions/getContacts';
import { ContactTable } from '@/features/contact/components/ContactTable';

export default async function ContactPage() {
  const contacts = await getContacts();

  if (contacts.error || !contacts.data) {
    return (
      <div className="space-y-10 text-center">
        <AdminTitle subtitle="Contacts" />
        <div>
          <h1 className="text-2xl font-bold">Error fetching contacts</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-10">
      <AdminTitle subtitle="Contacts" />
      <ContactTable data={contacts.data} />
    </div>
  );
}
