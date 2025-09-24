import { SocialMedia } from '@/app/components/social-media'

export function Footer() {
  return (
    <footer className="flex justify-between w-full pt-4 border-t border-separator">
      <div className="">
        <span>© 2024~2025 sayoriqwq.</span>
      </div>
      <div className="flex items-center gap-4">
        <SocialMedia />
      </div>
    </footer>
  )
}
