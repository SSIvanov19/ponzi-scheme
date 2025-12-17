'use client';

import { ReferralContext } from '../lib/types';
import {
  Phone,
  PhoneOff,
  Heart,
  MessageCircle,
  Share2,
  Globe,
  Mail,
  Users,
  Presentation,
  Building2,
  Verified,
  MoreHorizontal,
  Check,
  CheckCheck,
  Mic,
  Video,
  Search,
  ChevronRight,
  Star,
  TrendingUp,
  ExternalLink,
  FileText,
} from 'lucide-react';

interface ReferralDisplayProps {
  context: ReferralContext;
  pitch: string;
  title: string;
}

export function ReferralDisplay({ context, pitch, title }: ReferralDisplayProps) {
  const components: Record<ReferralContext, React.ReactNode> = {
    discord_dm: <DiscordDM pitch={pitch} title={title} />,
    friend_introducer: <FriendChat pitch={pitch} title={title} />,
    public_website: <PublicWebsite pitch={pitch} title={title} />,
    cold_call: <ColdCall pitch={pitch} title={title} />,
    telegram_group: <TelegramGroup pitch={pitch} title={title} />,
    conference_booth: <ConferenceBooth pitch={pitch} title={title} />,
    regulated_broker: <BrokerPortal pitch={pitch} title={title} />,
    facebook_ad: <FacebookAd pitch={pitch} title={title} />,
    influencer_sponsor: <InfluencerPost pitch={pitch} title={title} />,
    crypto_influencer: <CryptoInfluencer pitch={pitch} title={title} />,
    private_email_forward: <ForwardedEmail pitch={pitch} title={title} />,
    community_event: <CommunityEvent pitch={pitch} title={title} />,
    public_exchange_listing: <ExchangeListing pitch={pitch} title={title} />,
    bank_website: <BankWebsite pitch={pitch} title={title} />,
    instagram_dm: <InstagramDM pitch={pitch} title={title} />,
    startup_pitch_night: <StartupPitch pitch={pitch} title={title} />,
    whatsapp_group: <WhatsAppGroup pitch={pitch} title={title} />,
    pitch_deck_forward: <PitchDeck pitch={pitch} title={title} />,
    crypto_conference: <CryptoConference pitch={pitch} title={title} />,
  };

  return (
    <div className="mb-4">
      <div className="text-xs text-slate-500 mb-2 uppercase tracking-wide">How you heard about it:</div>
      {components[context]}
    </div>
  );
}

// Discord DM mockup
function DiscordDM({ pitch, title }: { pitch: string; title: string }) {
  return (
    <div className="bg-[#36393f] rounded-lg overflow-hidden border border-[#202225]">
      {/* Discord Header */}
      <div className="bg-[#202225] px-3 py-2 flex items-center gap-2 border-b border-[#202225]">
        <div className="w-6 h-6 rounded-full bg-[#5865f2] flex items-center justify-center">
          <span className="text-white text-xs font-bold">C</span>
        </div>
        <span className="text-white text-sm font-medium">CryptoAlpha_Trader</span>
        <span className="text-[#72767d] text-xs">#1337</span>
      </div>
      {/* Message */}
      <div className="p-3">
        <div className="flex gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex-shrink-0" />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[#5865f2] font-medium text-sm">CryptoAlpha_Trader</span>
              <span className="text-[#72767d] text-xs">Today at 11:42 PM</span>
            </div>
            <p className="text-[#dcddde] text-sm">Hey bro, you gotta check this out 🚀</p>
            <div className="mt-2 bg-[#2f3136] rounded p-3 border-l-4 border-[#5865f2]">
              <p className="text-white text-sm font-medium mb-1">{title}</p>
              <p className="text-[#b9bbbe] text-xs">{pitch}</p>
            </div>
            <p className="text-[#dcddde] text-sm mt-2">DM me if you want the invite link, spots are limited 👀</p>
          </div>
        </div>
      </div>
      {/* Input */}
      <div className="px-3 pb-3">
        <div className="bg-[#40444b] rounded-lg px-3 py-2 text-[#72767d] text-sm flex items-center">
          <span>Message @CryptoAlpha_Trader</span>
        </div>
      </div>
    </div>
  );
}

// Friend text message mockup
function FriendChat({ pitch }: { pitch: string; title: string }) {
  return (
    <div className="bg-slate-900 rounded-2xl overflow-hidden border border-slate-700">
      {/* iMessage-style header */}
      <div className="bg-slate-800 px-4 py-2 flex items-center justify-between border-b border-slate-700">
        <ChevronRight className="w-5 h-5 text-blue-400 rotate-180" />
        <div className="text-center">
          <div className="text-white text-sm font-medium">Uncle Mike</div>
          <div className="text-slate-500 text-xs">iMessage</div>
        </div>
        <Video className="w-5 h-5 text-blue-400" />
      </div>
      {/* Messages */}
      <div className="p-3 space-y-2">
        <div className="flex justify-start">
          <div className="bg-slate-700 rounded-2xl rounded-bl-sm px-4 py-2 max-w-[85%]">
            <p className="text-white text-sm">Hey! Remember how I said I found something good for the family?</p>
          </div>
        </div>
        <div className="flex justify-start">
          <div className="bg-slate-700 rounded-2xl rounded-bl-sm px-4 py-2 max-w-[85%]">
            <p className="text-white text-sm">{pitch}</p>
          </div>
        </div>
        <div className="flex justify-start">
          <div className="bg-slate-700 rounded-2xl rounded-bl-sm px-4 py-2 max-w-[85%]">
            <p className="text-white text-sm">Everyone at church is doing it. You should get in too! 🙏</p>
          </div>
        </div>
        <div className="text-center text-slate-500 text-xs">Delivered</div>
      </div>
    </div>
  );
}

// Public Website mockup
function PublicWebsite({ pitch, title }: { pitch: string; title: string }) {
  return (
    <div className="bg-white rounded-lg overflow-hidden border border-gray-200">
      {/* Browser bar */}
      <div className="bg-gray-100 px-3 py-2 flex items-center gap-2 border-b">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-400" />
          <div className="w-3 h-3 rounded-full bg-yellow-400" />
          <div className="w-3 h-3 rounded-full bg-green-400" />
        </div>
        <div className="flex-1 bg-white rounded px-3 py-1 text-xs text-gray-600 flex items-center gap-2">
          <Globe className="w-3 h-3" />
          <span>https://secure-invest-fund.com</span>
          <Verified className="w-3 h-3 text-green-500 ml-auto" />
        </div>
      </div>
      {/* Website content */}
      <div className="p-4 bg-gradient-to-b from-blue-50 to-white">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
            <TrendingUp className="w-5 h-5 text-white" />
          </div>
          <span className="font-bold text-gray-800">{title.slice(0, 30)}...</span>
        </div>
        <p className="text-gray-600 text-sm mb-3">{pitch}</p>
        <button className="w-full bg-blue-600 text-white py-2 rounded font-medium text-sm hover:bg-blue-700">
          Start Investing Today →
        </button>
      </div>
    </div>
  );
}

// Cold Call mockup
function ColdCall({ pitch }: { pitch: string; title: string }) {
  return (
    <div className="bg-slate-900 rounded-2xl overflow-hidden border border-slate-700">
      {/* Call screen */}
      <div className="bg-gradient-to-b from-green-900 to-slate-900 p-6 text-center">
        <div className="w-20 h-20 rounded-full bg-slate-700 mx-auto mb-4 flex items-center justify-center">
          <Phone className="w-10 h-10 text-green-400" />
        </div>
        <div className="text-white font-medium mb-1">Unknown Caller</div>
        <div className="text-slate-400 text-sm mb-4">+1 (800) 555-0199</div>
        <div className="text-green-400 text-sm mb-4">Connected 3:42</div>
        {/* Transcript */}
        <div className="bg-slate-800/80 rounded-lg p-3 text-left mb-4">
          <div className="text-slate-500 text-xs mb-1">📞 Caller:</div>
          <p className="text-slate-300 text-sm italic">&quot;Hi! I&apos;m calling about an exclusive investment opportunity. {pitch} Would you like to hear more?&quot;</p>
        </div>
        {/* Call controls */}
        <div className="flex justify-center gap-4">
          <button className="w-14 h-14 rounded-full bg-red-500 flex items-center justify-center">
            <PhoneOff className="w-6 h-6 text-white" />
          </button>
          <button className="w-14 h-14 rounded-full bg-slate-700 flex items-center justify-center">
            <Mic className="w-6 h-6 text-white" />
          </button>
        </div>
      </div>
    </div>
  );
}

// Telegram Group mockup
function TelegramGroup({ pitch }: { pitch: string; title: string }) {
  return (
    <div className="bg-[#17212b] rounded-lg overflow-hidden border border-[#0e1621]">
      {/* Telegram header */}
      <div className="bg-[#242f3d] px-3 py-2 flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
          <span className="text-white font-bold">💰</span>
        </div>
        <div className="flex-1">
          <div className="text-white font-medium text-sm">VIP Wealth Builders</div>
          <div className="text-[#6c7883] text-xs">3,847 members, 142 online</div>
        </div>
        <Search className="w-5 h-5 text-[#6c7883]" />
      </div>
      {/* Messages */}
      <div className="p-3 space-y-3">
        <div className="flex gap-2">
          <div className="w-8 h-8 rounded-full bg-orange-500 flex-shrink-0 flex items-center justify-center text-xs">👑</div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[#6ab2f2] text-sm font-medium">Admin_Alpha</span>
              <span className="bg-[#3a5f82] text-[#6ab2f2] text-xs px-1.5 rounded">ADMIN</span>
            </div>
            <div className="bg-[#182533] rounded-lg rounded-tl-none p-2">
              <p className="text-white text-sm">🚨 ANNOUNCEMENT 🚨</p>
              <p className="text-[#aaaaaa] text-sm mt-1">{pitch}</p>
              <p className="text-[#aaaaaa] text-sm mt-1">DM me for exclusive access! Limited spots 🔥</p>
            </div>
            <div className="text-[#6c7883] text-xs mt-1">2:34 PM ✓✓</div>
          </div>
        </div>
        <div className="flex gap-2">
          <div className="w-8 h-8 rounded-full bg-green-500 flex-shrink-0" />
          <div className="bg-[#182533] rounded-lg rounded-tl-none p-2">
            <span className="text-[#6ab2f2] text-sm">@newbie_investor</span>
            <p className="text-white text-sm">Just deposited! This is legit guys 💯</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// Conference Booth mockup
function ConferenceBooth({ pitch, title }: { pitch: string; title: string }) {
  return (
    <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-lg overflow-hidden border border-slate-600">
      {/* Conference badge */}
      <div className="bg-blue-600 px-4 py-2 flex items-center justify-between">
        <span className="text-white text-xs font-medium">FINTECH SUMMIT 2024</span>
        <span className="text-white/70 text-xs">Booth #247</span>
      </div>
      <div className="p-4">
        <div className="flex items-start gap-3">
          <div className="w-16 h-16 bg-gradient-to-br from-gold-400 to-yellow-600 rounded-lg flex items-center justify-center flex-shrink-0" style={{background: 'linear-gradient(135deg, #fbbf24, #d97706)'}}>
            <Building2 className="w-8 h-8 text-white" />
          </div>
          <div>
            <h3 className="text-white font-bold mb-1">{title.slice(0, 25)}...</h3>
            <p className="text-slate-400 text-sm mb-2">{pitch}</p>
            <div className="flex gap-2">
              <span className="bg-slate-700 text-slate-300 text-xs px-2 py-1 rounded">📄 Brochure</span>
              <span className="bg-slate-700 text-slate-300 text-xs px-2 py-1 rounded">💳 Free pen!</span>
            </div>
          </div>
        </div>
        <div className="mt-3 bg-slate-700/50 rounded p-2 text-center">
          <p className="text-slate-400 text-xs">Rep says: &quot;Sign up today for our exclusive conference rate!&quot;</p>
        </div>
      </div>
    </div>
  );
}

// Broker Portal mockup
function BrokerPortal({ pitch, title }: { pitch: string; title: string }) {
  return (
    <div className="bg-white rounded-lg overflow-hidden border border-gray-200">
      <div className="bg-slate-800 px-4 py-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-green-500 rounded flex items-center justify-center">
            <Check className="w-4 h-4 text-white" />
          </div>
          <span className="text-white text-sm font-medium">SecureInvest Pro</span>
        </div>
        <span className="text-green-400 text-xs flex items-center gap-1">
          <Verified className="w-3 h-3" /> SEC Registered
        </span>
      </div>
      <div className="p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-bold text-gray-800">{title.slice(0, 30)}...</h3>
          <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded">Available</span>
        </div>
        <p className="text-gray-600 text-sm mb-3">{pitch}</p>
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="bg-gray-50 p-2 rounded">
            <div className="text-gray-500">Min Investment</div>
            <div className="font-medium text-gray-800">$5,000</div>
          </div>
          <div className="bg-gray-50 p-2 rounded">
            <div className="text-gray-500">Risk Level</div>
            <div className="font-medium text-yellow-600">Moderate</div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Facebook Ad mockup
function FacebookAd({ pitch, title }: { pitch: string; title: string }) {
  return (
    <div className="bg-white rounded-lg overflow-hidden border border-gray-200">
      {/* Facebook post header */}
      <div className="p-3 flex items-center gap-2">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
          <TrendingUp className="w-5 h-5 text-white" />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-1">
            <span className="font-medium text-gray-900 text-sm">{title.slice(0, 25)}...</span>
            <Verified className="w-4 h-4 text-blue-500" />
          </div>
          <div className="text-gray-500 text-xs flex items-center gap-1">
            Sponsored · <Globe className="w-3 h-3" />
          </div>
        </div>
        <MoreHorizontal className="w-5 h-5 text-gray-400" />
      </div>
      {/* Content */}
      <div className="px-3 pb-2">
        <p className="text-gray-800 text-sm">{pitch} 🚀💰</p>
        <p className="text-blue-600 text-sm mt-1">Learn more →</p>
      </div>
      {/* Image placeholder */}
      <div className="bg-gradient-to-br from-green-400 to-blue-500 h-32 flex items-center justify-center">
        <div className="text-white text-center">
          <div className="text-3xl font-bold">10X Returns</div>
          <div className="text-sm opacity-80">Start with just $100</div>
        </div>
      </div>
      {/* Engagement */}
      <div className="p-3 border-t border-gray-100">
        <div className="flex items-center justify-between text-gray-500 text-sm">
          <div className="flex items-center gap-1">
            <div className="flex -space-x-1">
              <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center text-xs">👍</div>
              <div className="w-5 h-5 rounded-full bg-red-500 flex items-center justify-center text-xs">❤️</div>
            </div>
            <span>2.4K</span>
          </div>
          <span>847 comments · 312 shares</span>
        </div>
      </div>
    </div>
  );
}

// Instagram Influencer mockup
function InfluencerPost({ pitch }: { pitch: string; title: string }) {
  return (
    <div className="bg-white rounded-lg overflow-hidden border border-gray-200">
      {/* YouTube style header */}
      <div className="p-3 flex items-center gap-3 bg-gray-50">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-500 to-orange-400" />
        <div className="flex-1">
          <div className="flex items-center gap-1">
            <span className="font-medium text-gray-900 text-sm">FinanceGuru_Official</span>
            <Verified className="w-4 h-4 text-blue-500" />
          </div>
          <div className="text-gray-500 text-xs">2.3M subscribers</div>
        </div>
        <button className="bg-red-600 text-white px-3 py-1 rounded text-sm font-medium">Subscribe</button>
      </div>
      {/* Video thumbnail */}
      <div className="bg-slate-900 h-36 flex items-center justify-center relative">
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="w-16 h-16 rounded-full bg-red-600/90 flex items-center justify-center">
          <div className="w-0 h-0 border-l-[20px] border-l-white border-y-[12px] border-y-transparent ml-1" />
        </div>
        <div className="absolute bottom-2 left-2 right-2">
          <div className="text-white font-bold text-sm">I Made $50K/Month With This ONE Strategy...</div>
        </div>
        <div className="absolute bottom-2 right-2 bg-black/80 px-1 text-white text-xs rounded">12:34</div>
      </div>
      {/* Description */}
      <div className="p-3">
        <p className="text-gray-600 text-sm">{pitch}</p>
        <p className="text-blue-600 text-sm mt-1">🔗 Link in bio! #sponsored #ad</p>
      </div>
    </div>
  );
}

// Crypto Influencer (Twitter/X style)
function CryptoInfluencer({ pitch }: { pitch: string; title: string }) {
  return (
    <div className="bg-black rounded-lg overflow-hidden border border-gray-800">
      {/* X Header */}
      <div className="p-3 flex items-start gap-3">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center text-2xl">
          🦁
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1 flex-wrap">
            <span className="font-bold text-white">CryptoKing</span>
            <Verified className="w-4 h-4 text-yellow-400" />
            <span className="text-gray-500 text-sm">@crypto_king_official</span>
            <span className="text-gray-500 text-sm">· 2h</span>
          </div>
          <p className="text-white mt-2">🚨 ALPHA LEAK 🚨</p>
          <p className="text-white mt-1">{pitch}</p>
          <p className="text-white mt-2">This is NOT financial advice but I just 10x&apos;d my bag 💰🔥</p>
          <p className="text-blue-400 mt-1">Link below 👇 (NFA DYOR)</p>
          {/* Engagement */}
          <div className="flex items-center gap-6 mt-3 text-gray-500">
            <div className="flex items-center gap-1"><MessageCircle className="w-4 h-4" /> 892</div>
            <div className="flex items-center gap-1"><Share2 className="w-4 h-4" /> 2.1K</div>
            <div className="flex items-center gap-1"><Heart className="w-4 h-4" /> 8.4K</div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Forwarded Email mockup
function ForwardedEmail({ pitch, title }: { pitch: string; title: string }) {
  return (
    <div className="bg-white rounded-lg overflow-hidden border border-gray-200">
      {/* Email header */}
      <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
        <div className="flex items-center gap-2 mb-2">
          <Mail className="w-5 h-5 text-gray-400" />
          <span className="font-medium text-gray-800">Fwd: MUST SEE - Investment Opportunity</span>
        </div>
        <div className="text-sm text-gray-500 space-y-1">
          <div><span className="font-medium">From:</span> uncle.bob@email.com</div>
          <div><span className="font-medium">To:</span> you@email.com</div>
        </div>
      </div>
      {/* Email body */}
      <div className="p-4">
        <p className="text-gray-700 text-sm mb-3">Hey, check this out! I think you&apos;d be interested:</p>
        <div className="bg-gray-100 rounded p-3 border-l-4 border-blue-500">
          <p className="text-gray-500 text-xs mb-2">---------- Forwarded message ----------</p>
          <p className="text-gray-800 font-medium mb-2">{title}</p>
          <p className="text-gray-600 text-sm">{pitch}</p>
          <p className="text-gray-600 text-sm mt-2">Reply to this email to get started!</p>
        </div>
        <p className="text-gray-700 text-sm mt-3">Let me know if you want in! - Uncle Bob</p>
      </div>
    </div>
  );
}

// Community Event mockup
function CommunityEvent({ pitch }: { pitch: string; title: string }) {
  return (
    <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-lg overflow-hidden border border-amber-200">
      <div className="bg-amber-600 px-4 py-2 flex items-center gap-2">
        <Users className="w-5 h-5 text-white" />
        <span className="text-white font-medium text-sm">Community Wealth Seminar</span>
      </div>
      <div className="p-4">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-12 h-12 rounded-full bg-amber-200 flex items-center justify-center">
            <span className="text-2xl">🤝</span>
          </div>
          <div>
            <div className="font-bold text-gray-800">Brother Marcus</div>
            <div className="text-gray-500 text-sm">Community Financial Advisor</div>
          </div>
        </div>
        <div className="bg-white rounded-lg p-3 shadow-sm">
          <p className="text-gray-600 text-sm italic">&quot;{pitch}&quot;</p>
          <p className="text-gray-600 text-sm mt-2">&quot;Everyone here has seen great returns. This is how we take care of our own!&quot;</p>
        </div>
        <div className="mt-3 flex items-center justify-between text-sm">
          <span className="text-amber-700">📍 Community Center</span>
          <span className="text-amber-700">☕ Refreshments provided</span>
        </div>
      </div>
    </div>
  );
}

// Public Exchange Listing mockup
function ExchangeListing({ pitch, title }: { pitch: string; title: string }) {
  return (
    <div className="bg-slate-900 rounded-lg overflow-hidden border border-slate-700">
      <div className="bg-slate-800 px-4 py-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-green-500 rounded" />
          <span className="text-white font-medium text-sm">NYSE</span>
        </div>
        <div className="flex items-center gap-2 text-xs">
          <span className="text-green-400">Market Open</span>
          <span className="text-slate-400">|</span>
          <span className="text-slate-400">Real-time data</span>
        </div>
      </div>
      <div className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div>
            <div className="text-white font-bold text-lg">{title.slice(0, 20)}...</div>
            <div className="text-slate-400 text-sm">TICK</div>
          </div>
          <div className="text-right">
            <div className="text-green-400 font-bold text-xl">$127.45</div>
            <div className="text-green-400 text-sm">+2.34 (+1.87%)</div>
          </div>
        </div>
        <p className="text-slate-400 text-sm">{pitch}</p>
        <div className="mt-3 grid grid-cols-3 gap-2 text-xs">
          <div className="bg-slate-800 p-2 rounded text-center">
            <div className="text-slate-500">Volume</div>
            <div className="text-white">2.4M</div>
          </div>
          <div className="bg-slate-800 p-2 rounded text-center">
            <div className="text-slate-500">P/E</div>
            <div className="text-white">18.2</div>
          </div>
          <div className="bg-slate-800 p-2 rounded text-center">
            <div className="text-slate-500">Div Yield</div>
            <div className="text-white">2.1%</div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Bank Website mockup
function BankWebsite({ pitch, title }: { pitch: string; title: string }) {
  return (
    <div className="bg-white rounded-lg overflow-hidden border border-gray-200">
      <div className="bg-blue-900 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-white rounded flex items-center justify-center">
            <Building2 className="w-5 h-5 text-blue-900" />
          </div>
          <span className="text-white font-medium">National Trust Bank</span>
        </div>
        <div className="flex items-center gap-1 text-green-400 text-xs">
          <Verified className="w-3 h-3" />
          <span>FDIC Insured</span>
        </div>
      </div>
      <div className="p-4">
        <div className="bg-blue-50 rounded-lg p-4 mb-3">
          <div className="flex items-center gap-2 mb-2">
            <Star className="w-5 h-5 text-yellow-500" />
            <span className="font-bold text-blue-900">Special Offer</span>
          </div>
          <h3 className="font-bold text-gray-800 mb-1">{title}</h3>
          <p className="text-gray-600 text-sm">{pitch}</p>
        </div>
        <div className="text-xs text-gray-500">
          *APY accurate as of posting. Terms and conditions apply. See offer details.
        </div>
      </div>
    </div>
  );
}

// Instagram DM mockup
function InstagramDM({ pitch }: { pitch: string; title: string }) {
  return (
    <div className="bg-black rounded-lg overflow-hidden border border-gray-800">
      {/* IG DM Header */}
      <div className="bg-black px-4 py-3 flex items-center gap-3 border-b border-gray-800">
        <ChevronRight className="w-6 h-6 text-white rotate-180" />
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400" />
        <div className="flex-1">
          <div className="flex items-center gap-1">
            <span className="text-white font-medium text-sm">wealth_mentor_pro</span>
            <Verified className="w-4 h-4 text-blue-500" />
          </div>
          <span className="text-gray-500 text-xs">Active now</span>
        </div>
        <Phone className="w-5 h-5 text-white" />
        <Video className="w-5 h-5 text-white" />
      </div>
      {/* Messages */}
      <div className="p-4 space-y-3">
        <div className="flex justify-start">
          <div className="bg-gray-800 rounded-2xl rounded-bl-sm px-4 py-2 max-w-[85%]">
            <p className="text-white text-sm">Hey! Saw you&apos;re interested in investing 👀</p>
          </div>
        </div>
        <div className="flex justify-start">
          <div className="bg-gray-800 rounded-2xl rounded-bl-sm px-4 py-2 max-w-[85%]">
            <p className="text-white text-sm">{pitch}</p>
          </div>
        </div>
        <div className="flex justify-start">
          <div className="bg-gray-800 rounded-2xl rounded-bl-sm px-4 py-2 max-w-[85%]">
            <p className="text-white text-sm">DM me &quot;INFO&quot; and I&apos;ll send you the details 💰🔥</p>
          </div>
        </div>
      </div>
      {/* Input */}
      <div className="p-3 border-t border-gray-800">
        <div className="bg-gray-900 rounded-full px-4 py-2 text-gray-500 text-sm">
          Message...
        </div>
      </div>
    </div>
  );
}

// Startup Pitch Night mockup
function StartupPitch({ pitch, title }: { pitch: string; title: string }) {
  return (
    <div className="bg-slate-900 rounded-lg overflow-hidden border border-slate-700">
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 px-4 py-2">
        <div className="flex items-center justify-between">
          <span className="text-white font-medium text-sm">🚀 Startup Pitch Night</span>
          <span className="text-white/70 text-xs">Demo Day 2024</span>
        </div>
      </div>
      <div className="p-4">
        <div className="bg-slate-800 rounded-lg p-4 mb-3">
          <div className="flex items-center gap-3 mb-3">
            <Presentation className="w-8 h-8 text-purple-400" />
            <div>
              <h3 className="text-white font-bold">{title.slice(0, 30)}...</h3>
              <p className="text-slate-400 text-sm">Seed Stage • Fintech</p>
            </div>
          </div>
          <p className="text-slate-300 text-sm">{pitch}</p>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-purple-400">Raising: $2M</span>
          <span className="text-slate-400">Min: $25K</span>
        </div>
        <div className="mt-3 bg-purple-900/30 rounded p-2 text-center">
          <p className="text-purple-300 text-xs">Founder: &quot;We&apos;re disrupting traditional finance!&quot;</p>
        </div>
      </div>
    </div>
  );
}

// WhatsApp Group mockup
function WhatsAppGroup({ pitch }: { pitch: string; title: string }) {
  return (
    <div className="bg-[#0b141a] rounded-lg overflow-hidden border border-[#222d34]">
      {/* WhatsApp header */}
      <div className="bg-[#202c33] px-3 py-2 flex items-center gap-3">
        <ChevronRight className="w-5 h-5 text-[#aebac1] rotate-180" />
        <div className="w-10 h-10 rounded-full bg-[#00a884] flex items-center justify-center">
          <Users className="w-6 h-6 text-white" />
        </div>
        <div className="flex-1">
          <div className="text-white font-medium text-sm">💰 Passive Income Family 💰</div>
          <div className="text-[#8696a0] text-xs">You, +234 others</div>
        </div>
        <Video className="w-5 h-5 text-[#aebac1]" />
        <Phone className="w-5 h-5 text-[#aebac1]" />
      </div>
      {/* Messages with WhatsApp wallpaper */}
      <div className="p-3 space-y-2 bg-[#0b141a]" style={{backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23182229\' fill-opacity=\'0.4\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")'}}>
        <div className="flex justify-start">
          <div className="bg-[#202c33] rounded-lg rounded-tl-none p-2 max-w-[85%]">
            <span className="text-[#00a884] text-xs font-medium">+1 234 567 8900</span>
            <p className="text-[#e9edef] text-sm mt-1">🔥🔥🔥 BIG NEWS EVERYONE 🔥🔥🔥</p>
            <p className="text-[#e9edef] text-sm mt-1">{pitch}</p>
            <p className="text-[#e9edef] text-sm mt-1">Reply &quot;YES&quot; if you want in! 🙋‍♂️</p>
            <div className="text-[#8696a0] text-xs text-right mt-1">10:34 AM <CheckCheck className="w-3 h-3 inline text-[#53bdeb]" /></div>
          </div>
        </div>
        <div className="flex justify-start">
          <div className="bg-[#202c33] rounded-lg p-2 max-w-[50%]">
            <span className="text-[#e542a3] text-xs font-medium">Maria</span>
            <p className="text-[#e9edef] text-sm">YES! 🙌</p>
          </div>
        </div>
        <div className="flex justify-start">
          <div className="bg-[#202c33] rounded-lg p-2 max-w-[50%]">
            <span className="text-[#53bdeb] text-xs font-medium">John</span>
            <p className="text-[#e9edef] text-sm">Count me in!</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// Pitch Deck Forward mockup
function PitchDeck({ pitch, title }: { pitch: string; title: string }) {
  return (
    <div className="bg-white rounded-lg overflow-hidden border border-gray-200">
      <div className="bg-gray-100 px-4 py-3 flex items-center gap-3 border-b border-gray-200">
        <div className="w-10 h-10 bg-orange-500 rounded flex items-center justify-center">
          <FileText className="w-6 h-6 text-white" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="font-medium text-gray-800 text-sm truncate">{title} - Investor Deck.pdf</div>
          <div className="text-gray-500 text-xs">Shared via Google Drive</div>
        </div>
        <ExternalLink className="w-5 h-5 text-gray-400" />
      </div>
      <div className="p-4">
        <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg p-6 text-center mb-3">
          <div className="text-white/80 text-sm mb-2">INVESTMENT OPPORTUNITY</div>
          <h3 className="text-white font-bold text-lg mb-2">{title}</h3>
          <div className="text-white/70 text-sm">Seed Round • 2024</div>
        </div>
        <div className="bg-gray-50 rounded p-3">
          <h4 className="font-medium text-gray-800 text-sm mb-1">Executive Summary</h4>
          <p className="text-gray-600 text-sm">{pitch}</p>
        </div>
        <div className="mt-3 text-center">
          <span className="text-gray-500 text-xs">Slide 1 of 24</span>
        </div>
      </div>
    </div>
  );
}

// Crypto Conference mockup
function CryptoConference({ pitch, title }: { pitch: string; title: string }) {
  return (
    <div className="bg-black rounded-lg overflow-hidden border border-gray-800">
      <div className="bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 px-4 py-2">
        <div className="flex items-center justify-between">
          <span className="text-white font-bold text-sm">🌐 Web3 Summit 2024</span>
          <span className="text-white/80 text-xs">Main Stage</span>
        </div>
      </div>
      <div className="p-4">
        <div className="bg-gray-900 rounded-lg p-4 mb-3 border border-gray-800">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-400 to-purple-500 flex items-center justify-center">
              <span className="text-2xl">₿</span>
            </div>
            <div>
              <h3 className="text-white font-bold">{title.slice(0, 25)}...</h3>
              <p className="text-gray-400 text-sm">Featured Protocol</p>
            </div>
          </div>
          <p className="text-gray-300 text-sm">{pitch}</p>
        </div>
        <div className="flex gap-2 mb-3">
          <span className="bg-purple-900/50 text-purple-300 text-xs px-2 py-1 rounded">DeFi</span>
          <span className="bg-cyan-900/50 text-cyan-300 text-xs px-2 py-1 rounded">Yield</span>
          <span className="bg-pink-900/50 text-pink-300 text-xs px-2 py-1 rounded">Web3</span>
        </div>
        <div className="bg-gray-800 rounded p-2 text-center">
          <p className="text-gray-400 text-xs">Speaker: &quot;Early adopters will be rewarded. WAGMI!&quot; 🚀</p>
        </div>
      </div>
    </div>
  );
}
