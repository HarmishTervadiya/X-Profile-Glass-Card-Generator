const BlogAnnouncement = () => {
  return (
    <div className="max-w-5xl mx-auto mb-8">
      {/* Two Column Grid Layout */}
      <div className="grid md:grid-cols-2 gap-6 items-start">
        {/* Left Column - Blog Post */}
        <article className="bg-white rounded-2xl shadow-xl p-6 md:p-8 border border-gray-100">
          {/* Headline */}
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3 leading-tight">
            This Was an AI Image Generator. I Disabled It 2 Hours After Building
            It.
          </h2>

          {/* Sub-headline */}
          <p className="text-lg md:text-xl text-red-600 font-semibold mb-6 leading-relaxed">
            How I burned $3 in 5 minutes by making one classic developer
            mistake.
          </p>

          {/* Divider */}
          <div className="w-16 h-1 bg-gradient-to-r from-purple-400 to-blue-400 mb-6"></div>

          {/* Body */}
          <div className="prose max-w-none">
            <p className="text-gray-700 leading-relaxed mb-3 text-sm md:text-base">
              I saw the viral X Profile Image trend and, in a fit of "vibe
              coding," built this tool in a couple of hours for fun. The plan
              was to launch it tonight.
            </p>

            <p className="text-gray-700 leading-relaxed mb-3 text-sm md:text-base">
              It wrapped an AI model, taking a user's picture and generating a
              new image. It worked perfectly.
            </p>

            <p className="text-gray-700 leading-relaxed mb-3 text-sm md:text-base">
              Then I checked the billing page.
            </p>

            <p className="text-gray-700 leading-relaxed mb-3 text-sm md:text-base">
              I had assumed the image AI had a generous free tier, just like
              text models. I was wrong. It had no free tier, and I had already
              spent <span className="font-bold text-red-600">$3</span> on my
              first 5-10 test generations.
            </p>

            <p className="text-gray-700 leading-relaxed mb-4 text-sm md:text-base">
              If I had launched this publicly, I would have woken up to a bill
              for thousands of dollars.
            </p>

            {/* Call-out box */}
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 my-6 rounded-r-lg">
              <p className="text-gray-900 font-bold text-base md:text-lg mb-1">
                This site is now a public service announcement and the most
                valuable $3 I've ever spent:
              </p>
              <p className="text-xl md:text-2xl font-black text-red-600 tracking-tight">
                ALWAYS. CHECK. THE. BILLING.
              </p>
            </div>

            {/* Attribution */}
            <p className="text-gray-500 text-xs md:text-sm mt-6 italic">
              <a
                className="cursor-pointer"
                href="https://x.com/HarmisTervadiya"
              >
                Harmis Tervadiya
              </a>
            </p>
          </div>
        </article>

        {/* Right Column - Preview Image */}
        <div className="relative group">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-200 to-blue-200 rounded-xl blur opacity-30 group-hover:opacity-50 transition duration-500"></div>
          <div className="relative bg-white rounded-xl p-3 shadow-lg">
            <div className="w-full max-w-[280px] mx-auto">
              <img
                src="/culprit.png"
                alt="The $3 AI-generated glass card that started it all"
                className="w-full h-auto object-cover rounded-lg"
                onError={(e) => {
                  // Fallback if image doesn't exist
                  e.currentTarget.src =
                    'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="682" height="1024" viewBox="0 0 682 1024"%3E%3Crect fill="%23f3f4f6" width="682" height="1024"/%3E%3Ctext x="50%25" y="45%25" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="24" fill="%236b7280"%3EThe $3 Card%3C/text%3E%3Ctext x="50%25" y="52%25" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="16" fill="%239ca3af"%3EThat Could Have Cost%3C/text%3E%3Ctext x="50%25" y="58%25" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="20" fill="%23dc2626" font-weight="bold"%3EThousands%3C/text%3E%3C/svg%3E';
                }}
              />
            </div>
            <div className="mt-3 text-center">
              <p className="text-sm font-semibold text-gray-700 mb-1">
                The Culprit
              </p>
              <p className="text-xs text-gray-500">
                This AI-generated card cost $0.30-$0.60 to create
              </p>
              <p className="text-xs text-red-600 font-medium mt-1">
                Imagine 1,000 users... 💸
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogAnnouncement;
