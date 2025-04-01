import Image from 'next-export-optimize-images/image'
import Android from '@/assets/images/gpt-at-polls.jpg';

export default function Home() {
  return (
    <div className='p-6 flex flex-col gap-12'>
      <div>
        <h1 className='text-2xl font-bold'>GPT at the Polls</h1>
        <p className='text-lg text-gray-500'>
          A research project that analyzes the political opinions of large
          language models.
        </p>
      </div>
      <Image
        className='rounded-lg'
        src={Android}
        alt='Android'
        width={360}
        height={360}
        priority
      />
    </div>
  );
}
