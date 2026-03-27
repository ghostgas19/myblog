import { Suspense } from 'react'
import { getMessages } from '@/lib/data'
import { formatDate } from '@/lib/utils'
import { DeleteMessageButton } from '@/components/admin/delete-message-button'
import { Mail, Clock, User } from 'lucide-react'

export const dynamic = 'force-dynamic'

async function MessagesList() {
  const messages = await getMessages()

  if (messages.length === 0) {
    return (
      <div className="bg-card border border-border rounded-sm p-12 text-center">
        <Mail className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
        <p className="font-mono text-xs tracking-[3px] uppercase text-muted-foreground">Belum ada pesan masuk.</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {messages.map((msg) => (
        <div 
          key={msg.id} 
          className="bg-card border border-border rounded-sm p-6 group hover:border-amber/30 transition-colors"
        >
          <div className="flex justify-between items-start mb-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-amber/10 flex items-center justify-center">
                <User className="w-4 h-4 text-amber" />
              </div>
              <div>
                <p className="font-mono text-[10px] tracking-[2px] uppercase text-amber leading-none mb-1">
                  {msg.sender_name}
                </p>
                <div className="flex items-center gap-1.5 text-muted-foreground italic text-[10px]">
                  <Clock className="w-3 h-3" />
                  {formatDate(msg.created_at)}
                </div>
              </div>
            </div>
            <DeleteMessageButton id={msg.id} />
          </div>
          
          <div className="font-sans text-sm leading-relaxed text-foreground/90 whitespace-pre-wrap pl-11">
            {msg.content}
          </div>
        </div>
      ))}
    </div>
  )
}

export default function AdminMessagesPage() {
  return (
    <div className="p-6 max-w-4xl">
      <div className="mb-8">
        <h1 className="font-serif text-2xl font-bold text-foreground">Kotak Surat</h1>
        <p className="font-mono text-[10px] tracking-[2px] uppercase text-muted-foreground mt-0.5">
          Pesan anonim dari pengunjung
        </p>
      </div>

      <Suspense fallback={
        <div className="space-y-4">
          {[1,2,3].map(i => (
            <div key={i} className="h-32 bg-card border border-border rounded-sm animate-pulse" />
          ))}
        </div>
      }>
        <MessagesList />
      </Suspense>
    </div>
  )
}
