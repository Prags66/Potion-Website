import 'dotenv/config'
import mongoose from 'mongoose'
import Quote from './models/Quote.js'

// Quote library across 4 languages and 6 moods.
// lang codes: 'en' (English), 'hi' (Hindi), 'ur' (Urdu — written in
// Devanagari script by design, not Arabic/Nastaliq script), 'la' (Latin,
// classical proverbs — public domain).
const starterQuotes = [
  // =========================================================
  // ENGLISH
  // =========================================================
  { text: 'You are exactly where you need to be to grow into who you are becoming.', mood: 'calm', lang: 'en' },
  { text: 'Stillness is not empty — it is where the next step is quietly forming.', mood: 'calm', lang: 'en' },
  { text: 'The quietest rooms often hold the loudest truths, if you stay long enough to hear them.', mood: 'calm', lang: 'en' },
  { text: 'Let your breath be slower than your thoughts, just for a moment.', mood: 'calm', lang: 'en' },
  { text: 'Not every storm needs chasing — some simply need waiting out.', mood: 'calm', lang: 'en' },
  { text: "Peace rarely announces itself; it settles in while you're busy looking elsewhere.", mood: 'calm', lang: 'en' },
  { text: 'A calm mind is not an empty one — it is one that has made peace with not knowing everything yet.', mood: 'calm', lang: 'en' },
  { text: 'Rest is not the opposite of progress. Sometimes it is progress.', mood: 'calm', lang: 'en' },

  { text: 'Small steps, taken daily, quietly become unstoppable momentum.', mood: 'energized', lang: 'en' },
  { text: 'The fire in you was never meant to sit still.', mood: 'energized', lang: 'en' },
  { text: 'Energy spent on something you believe in is never wasted.', mood: 'energized', lang: 'en' },
  { text: "Today doesn't need to be perfect — it just needs you to begin.", mood: 'energized', lang: 'en' },
  { text: 'Motion, even imperfect motion, teaches you more than waiting ever will.', mood: 'energized', lang: 'en' },
  { text: "You don't need permission to start — only the willingness to move.", mood: 'energized', lang: 'en' },
  { text: "The spark you're looking for outside is already lit inside you.", mood: 'energized', lang: 'en' },
  { text: 'Momentum is built one honest effort at a time, not one perfect one.', mood: 'energized', lang: 'en' },

  { text: 'Hope is the quiet stubbornness that keeps showing up.', mood: 'hopeful', lang: 'en' },
  { text: 'Even the longest winter answers to spring, eventually.', mood: 'hopeful', lang: 'en' },
  { text: 'What feels unfinished today is simply still becoming.', mood: 'hopeful', lang: 'en' },
  { text: "A single ember is enough to promise that the fire isn't over.", mood: 'hopeful', lang: 'en' },
  { text: "Tomorrow doesn't owe you anything, but it rarely arrives empty-handed either.", mood: 'hopeful', lang: 'en' },
  { text: "Hope isn't naive — it's the bravest kind of patience.", mood: 'hopeful', lang: 'en' },
  { text: "Somewhere ahead, a version of today's struggle is just a story you'll tell calmly.", mood: 'hopeful', lang: 'en' },
  { text: "The door that hasn't opened yet is not the same as a door that's locked.", mood: 'hopeful', lang: 'en' },

  { text: 'Courage is not the absence of fear, but the choice to move anyway.', mood: 'courageous', lang: 'en' },
  { text: 'The bravest thing you can do today might just be showing up.', mood: 'courageous', lang: 'en' },
  { text: 'Fear makes a convincing case, but it rarely tells the whole story.', mood: 'courageous', lang: 'en' },
  { text: "You don't need to feel ready to be capable.", mood: 'courageous', lang: 'en' },
  { text: 'Every brave thing you have ever done started as a small, uncertain yes.', mood: 'courageous', lang: 'en' },
  { text: "Courage doesn't roar — sometimes it just whispers 'try again.'", mood: 'courageous', lang: 'en' },
  { text: 'The trembling hand can still open the door.', mood: 'courageous', lang: 'en' },
  { text: "What you're afraid to start is often exactly what's waiting to change you.", mood: 'courageous', lang: 'en' },

  { text: 'Let the spark you carry catch light in everything you touch today.', mood: 'inspired', lang: 'en' },
  { text: 'An idea worth having is worth being interrupted a hundred times for.', mood: 'inspired', lang: 'en' },
  { text: "Inspiration rarely shouts — it taps gently and waits to see if you'll answer.", mood: 'inspired', lang: 'en' },
  { text: "The world doesn't need a perfect version of your idea, just a started one.", mood: 'inspired', lang: 'en' },
  { text: 'Curiosity is the quiet cousin of courage.', mood: 'inspired', lang: 'en' },
  { text: 'Something ordinary, looked at closely enough, always turns out to be extraordinary.', mood: 'inspired', lang: 'en' },
  { text: "You are allowed to be inspired by something you haven't finished understanding yet.", mood: 'inspired', lang: 'en' },
  { text: "Every masterpiece was once just someone's willingness to keep going.", mood: 'inspired', lang: 'en' },

  { text: 'Even in the quiet grey, something in you is still growing.', mood: 'melancholic', lang: 'en' },
  { text: "It's alright to sit with the ache for a while before you set it down.", mood: 'melancholic', lang: 'en' },
  { text: 'Sadness is not a malfunction — it is proof that something mattered.', mood: 'melancholic', lang: 'en' },
  { text: 'Some days ask only that you survive them gently.', mood: 'melancholic', lang: 'en' },
  { text: 'The heaviness you feel today is not a permanent address.', mood: 'melancholic', lang: 'en' },
  { text: "You don't owe anyone a cheerful face while you're healing.", mood: 'melancholic', lang: 'en' },
  { text: 'Even wilted things remember how to bloom.', mood: 'melancholic', lang: 'en' },
  { text: 'There is a quiet kind of strength in simply getting through today.', mood: 'melancholic', lang: 'en' },

  { text: "The floor doesn't need to be swept before you're allowed to breathe.", mood: 'calm', lang: 'en' },
  { text: "Some answers only arrive after you've stopped chasing them.", mood: 'calm', lang: 'en' },
  { text: 'You can put the weight down for a moment without abandoning the load.', mood: 'calm', lang: 'en' },
  { text: 'A quiet evening is not a wasted one.', mood: 'calm', lang: 'en' },

  { text: 'The first rep is always the heaviest one.', mood: 'energized', lang: 'en' },
  { text: "You don't have to feel motivated to start moving anyway.", mood: 'energized', lang: 'en' },
  { text: 'Discipline is just motivation that decided to show up without asking.', mood: 'energized', lang: 'en' },
  { text: 'One honest hour beats ten distracted ones.', mood: 'energized', lang: 'en' },

  { text: "The seed doesn't know it's a tree yet, and grows anyway.", mood: 'hopeful', lang: 'en' },
  { text: 'Waiting rooms are still part of the story.', mood: 'hopeful', lang: 'en' },
  { text: "You've survived every hard day so far — that's not nothing.", mood: 'hopeful', lang: 'en' },
  { text: 'Somewhere, the version of you that made it through is already waving back.', mood: 'hopeful', lang: 'en' },

  { text: 'Nobody claps for the hardest step — you take it anyway.', mood: 'courageous', lang: 'en' },
  { text: "Brave doesn't mean unshaken. It means unstopped.", mood: 'courageous', lang: 'en' },
  { text: "The risk you keep circling is smaller once you're standing in it.", mood: 'courageous', lang: 'en' },
  { text: 'You are allowed to be scared and still go.', mood: 'courageous', lang: 'en' },

  { text: 'Borrow the courage of people who started before they were ready.', mood: 'inspired', lang: 'en' },
  { text: 'A blank page is an invitation, not a verdict.', mood: 'inspired', lang: 'en' },
  { text: 'The best ideas rarely arrive polished — they arrive interruptible.', mood: 'inspired', lang: 'en' },
  { text: "Chase the question that won't leave you alone.", mood: 'inspired', lang: 'en' },

  { text: 'Grief is love with nowhere left to go, for now.', mood: 'melancholic', lang: 'en' },
  { text: 'You are not behind — you are just walking a slower road today.', mood: 'melancholic', lang: 'en' },
  { text: 'Not every day has to make sense to still count.', mood: 'melancholic', lang: 'en' },
  { text: "The dark doesn't cancel the morning that's coming.", mood: 'melancholic', lang: 'en' },

  // =========================================================
  // HINDI
  // =========================================================
  { text: 'तुम ठीक वहीं हो, जहाँ तुम्हें अभी होना चाहिए।', mood: 'calm', lang: 'hi' },
  { text: 'खामोशी खाली नहीं होती, वह अगला कदम गढ़ रही होती है।', mood: 'calm', lang: 'hi' },
  { text: 'जो मन थमता है, वही सबसे दूर तक सुनता है।', mood: 'calm', lang: 'hi' },
  { text: 'साँस को विचारों से धीमा रहने दो, बस एक पल के लिए।', mood: 'calm', lang: 'hi' },
  { text: 'हर तूफ़ान का पीछा करना ज़रूरी नहीं, कुछ को बस गुज़र जाने दो।', mood: 'calm', lang: 'hi' },
  { text: 'सुकून अक्सर चुपचाप आता है, जब तुम कहीं और देख रहे होते हो।', mood: 'calm', lang: 'hi' },

  { text: 'छोटे कदम, रोज़ उठाए गए, चुपचाप एक अनरुकी रफ़्तार बन जाते हैं।', mood: 'energized', lang: 'hi' },
  { text: 'तुम्हारे भीतर की आग कभी रुकने के लिए नहीं बनी थी।', mood: 'energized', lang: 'hi' },
  { text: 'जिस चीज़ पर विश्वास हो, उस पर लगाई ऊर्जा कभी बेकार नहीं जाती।', mood: 'energized', lang: 'hi' },
  { text: 'आज परफेक्ट होने की ज़रूरत नहीं, बस शुरुआत करने की है।', mood: 'energized', lang: 'hi' },
  { text: 'चलना, अधूरा ही सही, इंतज़ार से कहीं ज़्यादा सिखाता है।', mood: 'energized', lang: 'hi' },
  { text: 'जिस चिंगारी की तलाश बाहर है, वह पहले से तुम्हारे भीतर जल रही है।', mood: 'energized', lang: 'hi' },

  { text: 'उम्मीद वह ज़िद है जो चुपचाप बार-बार लौट आती है।', mood: 'hopeful', lang: 'hi' },
  { text: 'सबसे लंबी सर्दी भी आख़िर बसंत के आगे झुक जाती है।', mood: 'hopeful', lang: 'hi' },
  { text: 'जो आज अधूरा लगता है, वह बस अभी बन रहा है।', mood: 'hopeful', lang: 'hi' },
  { text: 'एक चिंगारी काफ़ी है यह कहने के लिए कि आग अभी बाकी है।', mood: 'hopeful', lang: 'hi' },
  { text: 'कल कुछ देने का वादा नहीं करता, पर अक्सर खाली हाथ भी नहीं आता।', mood: 'hopeful', lang: 'hi' },
  { text: 'जो दरवाज़ा अभी नहीं खुला, वह बंद दरवाज़े जैसा नहीं होता।', mood: 'hopeful', lang: 'hi' },

  { text: 'साहस डर की अनुपस्थिति नहीं, बल्कि फिर भी आगे बढ़ने का चुनाव है।', mood: 'courageous', lang: 'hi' },
  { text: 'आज की सबसे बहादुर बात शायद बस हाज़िर होना ही हो।', mood: 'courageous', lang: 'hi' },
  { text: 'डर एक ठोस दलील देता है, पर वह पूरी कहानी कभी नहीं बताता।', mood: 'courageous', lang: 'hi' },
  { text: 'सक्षम होने के लिए तैयार महसूस करना ज़रूरी नहीं।', mood: 'courageous', lang: 'hi' },
  { text: 'हर बहादुर काम एक छोटी, अनिश्चित हाँ से शुरू हुआ था।', mood: 'courageous', lang: 'hi' },
  { text: 'कांपता हुआ हाथ भी दरवाज़ा खोल सकता है।', mood: 'courageous', lang: 'hi' },

  { text: 'जो चिंगारी तुम साथ लिए फिरते हो, उसे आज हर चीज़ में जलने दो।', mood: 'inspired', lang: 'hi' },
  { text: 'एक अच्छा विचार सौ बार टूटने लायक होता है।', mood: 'inspired', lang: 'hi' },
  { text: 'प्रेरणा शायद ही चिल्लाती है, वह बस हल्के से दस्तक देकर इंतज़ार करती है।', mood: 'inspired', lang: 'hi' },
  { text: 'दुनिया को तुम्हारे विचार का परफेक्ट रूप नहीं, बस शुरू किया हुआ रूप चाहिए।', mood: 'inspired', lang: 'hi' },
  { text: 'जिज्ञासा साहस की ख़ामोश बहन है।', mood: 'inspired', lang: 'hi' },
  { text: 'हर उत्कृष्ट रचना कभी सिर्फ़ जारी रहने की ज़िद थी।', mood: 'inspired', lang: 'hi' },

  { text: 'धुंधलेपन में भी, तुम्हारे भीतर कुछ अब भी बढ़ रहा है।', mood: 'melancholic', lang: 'hi' },
  { text: 'दर्द के साथ थोड़ी देर बैठना ठीक है, उसे रखने से पहले।', mood: 'melancholic', lang: 'hi' },
  { text: 'उदासी खराबी नहीं, यह सबूत है कि कुछ मायने रखता था।', mood: 'melancholic', lang: 'hi' },
  { text: 'कुछ दिन बस इतना माँगते हैं कि तुम उन्हें धीरे से गुज़ार दो।', mood: 'melancholic', lang: 'hi' },
  { text: 'आज का भारीपन तुम्हारा स्थायी पता नहीं है।', mood: 'melancholic', lang: 'hi' },
  { text: 'मुरझाई हुई चीज़ों को भी खिलना याद रहता है।', mood: 'melancholic', lang: 'hi' },

  { text: 'फ़र्श साफ़ हुए बिना भी साँस लेने की इजाज़त है।', mood: 'calm', lang: 'hi' },
  { text: 'कुछ जवाब तभी मिलते हैं जब उनका पीछा करना छोड़ दो।', mood: 'calm', lang: 'hi' },
  { text: 'एक शांत शाम बेकार शाम नहीं होती।', mood: 'calm', lang: 'hi' },

  { text: 'पहला कदम हमेशा सबसे भारी लगता है।', mood: 'energized', lang: 'hi' },
  { text: 'शुरू करने के लिए प्रेरित महसूस करना ज़रूरी नहीं।', mood: 'energized', lang: 'hi' },
  { text: 'अनुशासन बस वह प्रेरणा है जो बिना पूछे हाज़िर हो जाती है।', mood: 'energized', lang: 'hi' },

  { text: 'बीज को नहीं पता कि वह पेड़ बनेगा, फिर भी वह बढ़ता रहता है।', mood: 'hopeful', lang: 'hi' },
  { text: 'इंतज़ार के पल भी कहानी का हिस्सा होते हैं।', mood: 'hopeful', lang: 'hi' },
  { text: 'अब तक हर मुश्किल दिन झेला है, यही कुछ कम नहीं।', mood: 'hopeful', lang: 'hi' },

  { text: 'सबसे कठिन कदम पर कोई तालियाँ नहीं बजाता, फिर भी तुम उठाते हो।', mood: 'courageous', lang: 'hi' },
  { text: 'बहादुरी का मतलब न डरना नहीं, न रुकना है।', mood: 'courageous', lang: 'hi' },
  { text: 'डरना और फिर भी आगे बढ़ना, यही असली हिम्मत है।', mood: 'courageous', lang: 'hi' },

  { text: 'जो लोग तैयार होने से पहले शुरू हुए, उनकी हिम्मत उधार ले लो।', mood: 'inspired', lang: 'hi' },
  { text: 'खाली पन्ना एक न्योता है, फ़ैसला नहीं।', mood: 'inspired', lang: 'hi' },
  { text: 'जो सवाल पीछा नहीं छोड़ता, उसी का पीछा करो।', mood: 'inspired', lang: 'hi' },

  { text: 'दुख वह प्यार है जिसे अभी जाने की जगह नहीं मिली।', mood: 'melancholic', lang: 'hi' },
  { text: 'तुम पीछे नहीं हो, बस आज धीमी राह पर हो।', mood: 'melancholic', lang: 'hi' },
  { text: 'अंधेरा उस सुबह को नहीं रोक सकता जो आ रही है।', mood: 'melancholic', lang: 'hi' },

  // =========================================================
  // URDU (written in Devanagari/Hindi script, by request)
  // =========================================================
  { text: 'दिल को थोड़ा ठहरने दो, हर मंज़र भागने के लिए नहीं होता।', mood: 'calm', lang: 'ur' },
  { text: 'सुकून शोर में नहीं, ख़ामोशी के दरमियान छुपा होता है।', mood: 'calm', lang: 'ur' },
  { text: 'जो लहरें थम जाती हैं, वही साहिल तक सही सलामत पहुँचती हैं।', mood: 'calm', lang: 'ur' },
  { text: 'हर तूफ़ान का जवाब भागना नहीं, कभी-कभी ठहरना भी होता है।', mood: 'calm', lang: 'ur' },
  { text: 'साँसों को इतना वक़्त दो कि ख़यालात पीछे रह जाएँ।', mood: 'calm', lang: 'ur' },
  { text: 'सुकून अक्सर उस पल आता है, जब तलाश करना छोड़ देते हैं।', mood: 'calm', lang: 'ur' },

  { text: 'छोटी कोशिशें, हर रोज़ की, आख़िर एक तूफ़ान बन जाती हैं।', mood: 'energized', lang: 'ur' },
  { text: 'जो आग दिल में है, वो रुकने के लिए कभी थी ही नहीं।', mood: 'energized', lang: 'ur' },
  { text: 'जिस पर यक़ीन हो, उस पर लगाई मेहनत कभी ज़ाया नहीं जाती।', mood: 'energized', lang: 'ur' },
  { text: 'आज मुकम्मल होने की शर्त नहीं, बस चलने की ज़रूरत है।', mood: 'energized', lang: 'ur' },
  { text: 'अधूरा सफ़र भी इंतज़ार से कहीं ज़्यादा सिखा जाता है।', mood: 'energized', lang: 'ur' },
  { text: 'जिस रौशनी की तलाश बाहर है, वो पहले से अंदर जल रही है।', mood: 'energized', lang: 'ur' },

  { text: 'उम्मीद वो ज़िद है जो हर बार चुपके से लौट आती है।', mood: 'hopeful', lang: 'ur' },
  { text: 'सबसे लंबी सर्दी भी आख़िर बहार के आगे हार जाती है।', mood: 'hopeful', lang: 'ur' },
  { text: 'जो आज अधूरा है, वो बस अभी तराशा जा रहा है।', mood: 'hopeful', lang: 'ur' },
  { text: 'एक चिंगारी ही काफ़ी है ये कहने को कि आग अभी बाक़ी है।', mood: 'hopeful', lang: 'ur' },
  { text: 'कल कुछ वादा नहीं करता, मगर अक्सर ख़ाली हाथ भी नहीं आता।', mood: 'hopeful', lang: 'ur' },
  { text: 'जो दर अभी नहीं खुला, वो बंद दरवाज़े जैसा नहीं होता।', mood: 'hopeful', lang: 'ur' },

  { text: 'हौसला डर के मिट जाने का नाम नहीं, फिर भी बढ़ जाने का नाम है।', mood: 'courageous', lang: 'ur' },
  { text: 'आज का सबसे बड़ा कमाल शायद बस डटे रहना ही हो।', mood: 'courageous', lang: 'ur' },
  { text: 'डर एक मज़बूत दलील गढ़ता है, मगर पूरी बात कभी नहीं बताता।', mood: 'courageous', lang: 'ur' },
  { text: 'काबिल होने के लिए तैयार महसूस करना ज़रूरी नहीं।', mood: 'courageous', lang: 'ur' },
  { text: 'हर बड़ा क़दम एक छोटी, डरी हुई हाँ से शुरू हुआ था।', mood: 'courageous', lang: 'ur' },
  { text: 'काँपता हुआ हाथ भी दर खोल सकता है।', mood: 'courageous', lang: 'ur' },

  { text: 'जो चिंगारी तुम्हारे अंदर है, उसे आज हर चीज़ में उतर जाने दो।', mood: 'inspired', lang: 'ur' },
  { text: 'एक अच्छा ख़याल सौ बार टूटने के लायक होता है।', mood: 'inspired', lang: 'ur' },
  { text: 'इल्हाम कभी चिल्लाता नहीं, बस हल्के से दस्तक देकर रुक जाता है।', mood: 'inspired', lang: 'ur' },
  { text: 'दुनिया को तुम्हारे ख़याल की मुकम्मल शक्ल नहीं, बस शुरुआत चाहिए।', mood: 'inspired', lang: 'ur' },
  { text: 'तजस्सुस, हौसले का ख़ामोश साथी होता है।', mood: 'inspired', lang: 'ur' },
  { text: 'हर शाहकार कभी सिर्फ़ चलते रहने की ज़िद था।', mood: 'inspired', lang: 'ur' },

  { text: 'धुंधलके में भी, तुम्हारे अंदर कुछ अब भी पनप रहा है।', mood: 'melancholic', lang: 'ur' },
  { text: 'दर्द के साथ थोड़ी देर ठहरना ठीक है, उसे रखने से पहले।', mood: 'melancholic', lang: 'ur' },
  { text: 'उदासी कोई ख़राबी नहीं, ये निशानी है कि कुछ अहम था।', mood: 'melancholic', lang: 'ur' },
  { text: 'कुछ दिन बस इतना चाहते हैं कि तुम उन्हें नरमी से गुज़ार दो।', mood: 'melancholic', lang: 'ur' },
  { text: 'आज का बोझ तुम्हारा हमेशा का पता नहीं।', mood: 'melancholic', lang: 'ur' },
  { text: 'मुरझाए फूल को भी खिलना याद रहता है।', mood: 'melancholic', lang: 'ur' },

  { text: 'हर चीज़ सँवरे बिना भी साँस लेने का हक़ है।', mood: 'calm', lang: 'ur' },
  { text: 'कुछ जवाब तभी मिलते हैं जब तलाश छोड़ दी जाए।', mood: 'calm', lang: 'ur' },
  { text: 'एक ख़ामोश शाम भी बेकार नहीं होती।', mood: 'calm', lang: 'ur' },

  { text: 'पहला क़दम हमेशा सबसे भारी होता है।', mood: 'energized', lang: 'ur' },
  { text: 'शुरुआत के लिए जोश महसूस करना ज़रूरी नहीं।', mood: 'energized', lang: 'ur' },
  { text: 'ज़ब्त वो जोश है जो बिन बुलाए हाज़िर हो जाता है।', mood: 'energized', lang: 'ur' },

  { text: 'बीज को ख़बर नहीं कि वो दरख़्त बनेगा, फिर भी बढ़ता रहता है।', mood: 'hopeful', lang: 'ur' },
  { text: 'इंतज़ार के लम्हे भी कहानी का हिस्सा होते हैं।', mood: 'hopeful', lang: 'ur' },
  { text: 'अब तलक हर मुश्किल दिन सहा है, यही कम नहीं।', mood: 'hopeful', lang: 'ur' },

  { text: 'सबसे सख़्त क़दम पर कोई दाद नहीं देता, फिर भी उठाया जाता है।', mood: 'courageous', lang: 'ur' },
  { text: 'बहादुरी बेख़ौफ़ होना नहीं, न रुकना है।', mood: 'courageous', lang: 'ur' },
  { text: 'डर के बावजूद बढ़ जाना ही असली हौसला है।', mood: 'courageous', lang: 'ur' },

  { text: 'जो तैयार होने से पहले चल पड़े, उनका हौसला उधार ले लो।', mood: 'inspired', lang: 'ur' },
  { text: 'ख़ाली सफ़्हा एक दावत है, फ़ैसला नहीं।', mood: 'inspired', lang: 'ur' },
  { text: 'जो सवाल पीछा न छोड़े, उसी के पीछे चलो।', mood: 'inspired', lang: 'ur' },

  { text: 'ग़म वो मोहब्बत है जिसे अभी जाने की जगह नहीं मिली।', mood: 'melancholic', lang: 'ur' },
  { text: 'तुम पीछे नहीं, बस आज सुस्त राह पर हो।', mood: 'melancholic', lang: 'ur' },
  { text: 'अंधेरा उस सुबह को नहीं रोक सकता जो आने वाली है।', mood: 'melancholic', lang: 'ur' },

  // =========================================================
  // LATIN (classical proverbs — genuinely ancient, public domain)
  // =========================================================
  { text: 'Otium cum dignitate — leisure with dignity.', mood: 'calm', lang: 'la' },
  { text: 'Festina lente — make haste slowly.', mood: 'calm', lang: 'la' },
  { text: 'Aequam memento rebus in arduis servare mentem — remember to keep a calm mind in difficulties.', mood: 'calm', lang: 'la' },
  { text: 'Silentium est aureum — silence is golden.', mood: 'calm', lang: 'la' },
  { text: 'Aurea mediocritas — the golden mean.', mood: 'calm', lang: 'la' },
  { text: 'Concordia parvae res crescunt — through harmony, small things grow.', mood: 'calm', lang: 'la' },

  { text: 'Carpe diem — seize the day.', mood: 'energized', lang: 'la' },
  { text: 'Audentes fortuna iuvat — fortune favors the bold.', mood: 'energized', lang: 'la' },
  { text: 'Vincit qui se vincit — he conquers who conquers himself.', mood: 'energized', lang: 'la' },
  { text: 'Per angusta ad augusta — through difficulties to honors.', mood: 'energized', lang: 'la' },
  { text: 'Labor omnia vincit — work conquers all.', mood: 'energized', lang: 'la' },
  { text: 'Nihil sine labore — nothing without work.', mood: 'energized', lang: 'la' },

  { text: 'Per aspera ad astra — through hardships, to the stars.', mood: 'hopeful', lang: 'la' },
  { text: 'Dum spiro, spero — while I breathe, I hope.', mood: 'hopeful', lang: 'la' },
  { text: 'Spes ultima dea — hope is the last goddess to abandon us.', mood: 'hopeful', lang: 'la' },
  { text: 'Nil desperandum — never despair.', mood: 'hopeful', lang: 'la' },
  { text: 'Post nubila Phoebus — after the clouds, the sun.', mood: 'hopeful', lang: 'la' },
  { text: 'Spero meliora — I hope for better things.', mood: 'hopeful', lang: 'la' },

  { text: 'Fortis fortuna adiuvat — fortune favors the brave.', mood: 'courageous', lang: 'la' },
  { text: 'Non ducor, duco — I am not led, I lead.', mood: 'courageous', lang: 'la' },
  { text: 'Alea iacta est — the die is cast.', mood: 'courageous', lang: 'la' },
  { text: 'Audaces fortuna iuvat — fortune favors the daring.', mood: 'courageous', lang: 'la' },
  { text: 'Aut viam inveniam aut faciam — I shall find a way, or make one.', mood: 'courageous', lang: 'la' },
  { text: 'Nemo me impune lacessit — no one provokes me with impunity.', mood: 'courageous', lang: 'la' },

  { text: 'Ad astra per aspera — to the stars through difficulties.', mood: 'inspired', lang: 'la' },
  { text: 'Sic itur ad astra — thus one journeys to the stars.', mood: 'inspired', lang: 'la' },
  { text: 'Ars longa, vita brevis — art is long, life is short.', mood: 'inspired', lang: 'la' },
  { text: 'Nulla dies sine linea — no day without a line (of work).', mood: 'inspired', lang: 'la' },
  { text: 'Excelsior — ever upward.', mood: 'inspired', lang: 'la' },
  { text: 'Alis volat propriis — she flies with her own wings.', mood: 'inspired', lang: 'la' },

  { text: 'Tempus fugit — time flies.', mood: 'melancholic', lang: 'la' },
  { text: 'Sic transit gloria mundi — thus passes the glory of the world.', mood: 'melancholic', lang: 'la' },
  { text: 'Memento mori — remember that you will die.', mood: 'melancholic', lang: 'la' },
  { text: 'Omnia vulnerant, ultima necat — every hour wounds, the last one kills.', mood: 'melancholic', lang: 'la' },
  { text: 'Forsan et haec olim meminisse iuvabit — perhaps one day it will delight us to remember even this.', mood: 'melancholic', lang: 'la' },
  { text: 'Lacrimae rerum — the tears of things.', mood: 'melancholic', lang: 'la' },
]

async function seed() {
  await mongoose.connect(process.env.MONGODB_URI)
  await Quote.deleteMany({})
  await Quote.insertMany(starterQuotes)
  console.log(`Seeded ${starterQuotes.length} quotes across all 6 moods and 4 languages (English, Hindi, Urdu, Latin)`)
  await mongoose.disconnect()
}

seed().catch((err) => {
  console.error(err)
  process.exit(1)
})
