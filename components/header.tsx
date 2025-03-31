import { Link } from '@/components/links';

export function Header() {
  return (
    <header className='flex justify-between gap-6 rounded-lg bg-zinc-200 px-8 py-6 text-xl'>
      <div>
        <Link className='font-black' href='/'>
          gpt-at-the-polls.com
        </Link>
      </div>
    </header>
  );
}
