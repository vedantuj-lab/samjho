import { SampleDoc } from '../types.ts';

export const SAMPLE_DOCS: SampleDoc[] = [
  {
    id: 'rental-mumbai',
    title: '🏠 Rental Agreement (Mumbai Suburban)',
    category: 'Lease Agreement',
    icon: 'Home',
    badge: 'High Risk Clauses',
    recommendedFor: 'renter',
    rawText: `RESIDENTIAL LEASE AGREEMENT (EXTRACT)
Tenant: Amit Verma | Landlord: Rajesh Sharma
Premises: Flat 402, Sai Heights, Andheri West, Mumbai.
Monthly Rent: ₹35,000 payable on or before the 3rd of every month.
Security Deposit: ₹1,500,000 (Refundable within 90 days of vacating).
LOCK-IN PERIOD: 12 Months. If Tenant terminates the lease before 12 months, the entire Security Deposit shall be completely forfeited by the Landlord as liquidated damages.
LATE PAYMENT: Any rent payment delayed past the 3rd will incur an automatic daily penalty of ₹1,000 per day.
MAINTENANCE & PAINTING: Tenant shall pay standard society maintenance (₹4,500/month) and upon vacating, a non-negotiable deduction of ₹25,000 will be made from the deposit for repainting, regardless of condition.
NOTICE PERIOD: 2 months advance notice required after lock-in period.`,
    precomputedAnalysis: {
      en: {
        documentType: 'Residential Lease Agreement (Mumbai Suburban)',
        oneLiner: 'A 12-month apartment lease for Flat 402, Andheri West with severe deposit penalty and aggressive late fees.',
        verdict: {
          clarityScore: 42,
          recommendation: 'Needs Revision / Do Not Sign Yet',
          reason: 'Severe lock-in forfeiture of your ₹15,00,000 deposit and an unreasonable mandatory ₹25,000 painting deduction regardless of flat condition.'
        },
        summaryBullets: [
          'Monthly rent of ₹35,000 must be paid strictly on or before the 3rd of every month.',
          'Hefty security deposit of ₹15,00,000 with a delayed 90-day refund window post moving out.',
          '12-month lock-in period: if you move out even 1 month early, the landlord keeps all ₹15,00,000.',
          'Harsh daily late fine of ₹1,000 per day starting immediately on the 4th of each month.',
          'Compulsory ₹25,000 repainting deduction taken from your deposit even if the walls are spotless.'
        ],
        deadlines: [
          {
            date: '3rd of every month',
            description: 'Monthly rent of ₹35,000 is due. Delay attracts ₹1,000/day fine.',
            urgent: false
          },
          {
            date: '12 Months from Start',
            description: 'Mandatory lock-in period ends. Moving out before this forfeits entire ₹15 Lakh deposit.',
            urgent: true
          },
          {
            date: '90 days after vacating',
            description: 'Landlord timeline to refund security deposit (minus painting charges).',
            urgent: false
          }
        ],
        money: [
          {
            amount: '₹35,000 / month',
            description: 'Monthly base rent due by the 3rd',
            type: 'Monthly/Recurring'
          },
          {
            amount: '₹15,00,000',
            description: 'Refundable security deposit (held up to 90 days post vacating)',
            type: 'Deposit'
          },
          {
            amount: '₹4,500 / month',
            description: 'Standard society maintenance charges borne by tenant',
            type: 'Monthly/Recurring'
          },
          {
            amount: '₹1,000 / day',
            description: 'Automatic daily penalty for rent delayed past 3rd',
            type: 'Penalty'
          },
          {
            amount: '₹25,000',
            description: 'Mandatory repainting deduction on exit, regardless of wall condition',
            type: 'Hidden Fee'
          }
        ],
        redFlags: [
          {
            clause: 'If Tenant terminates the lease before 12 months, the entire Security Deposit shall be completely forfeited by the Landlord as liquidated damages.',
            explanation: 'Total forfeiture of ₹15 Lakhs for early departure is legally disproportionate and highly punitive for a tenant.',
            severity: 'High',
            whyItMatters: 'If you lose your job or need to relocate in month 8, you lose your entire ₹15,00,000 life savings immediately.'
          },
          {
            clause: 'upon vacating, a non-negotiable deduction of ₹25,000 will be made from the deposit for repainting, regardless of condition.',
            explanation: 'This is an unfair blanket hidden deduction that bypasses normal fair wear-and-tear standards.',
            severity: 'Medium',
            whyItMatters: 'You will never receive your full deposit back even if you keep the flat spotless or stay only for a few months.'
          },
          {
            clause: 'Any rent payment delayed past the 3rd will incur an automatic daily penalty of ₹1,000 per day.',
            explanation: 'Extremely aggressive late fee equaling over 85% APR on monthly rent.',
            severity: 'Medium',
            whyItMatters: 'A 5-day bank holiday or payroll glitch will cost you an extra ₹5,000 in immediate penalties.'
          }
        ],
        actions: [
          {
            id: 'act-1',
            task: 'Negotiate early termination clause (propose 1 month rent penalty instead of full ₹15L forfeiture).',
            dueDate: 'Before signing agreement'
          },
          {
            id: 'act-2',
            task: 'Request reducing deposit refund window from 90 days down to 15-30 days maximum.',
            dueDate: 'Before signing agreement'
          },
          {
            id: 'act-3',
            task: 'Inspect flat walls and take timestamped video evidence on move-in day.',
            dueDate: 'Move-in Day'
          },
          {
            id: 'act-4',
            task: 'Set recurring bank auto-debit for rent on the 1st of every month to avoid ₹1,000/day fine.',
            dueDate: '1st of every month'
          }
        ],
        suggestedQuestions: [
          'Can the landlord legally keep all ₹15,00,000 if I vacate 2 months early?',
          'Is the ₹25,000 painting deduction legally enforceable if the paint is undamaged?',
          'How can I modify the 90-day deposit refund period in Maharashtra rent control rules?'
        ]
      },
      hi: {
        documentType: 'आवासीय रेंटल एग्रीमेंट (मुंबई उपनगर)',
        oneLiner: 'अंधेरी वेस्ट फ्लैट 402 का 12 महीने का किराया समझौता जिसमें ₹15 लाख डिपॉज़िट ज़ब्त होने का भारी जोखिम है।',
        verdict: {
          clarityScore: 42,
          recommendation: 'Needs Revision / Do Not Sign Yet',
          reason: '12 महीने से पहले घर छोड़ने पर पूरे ₹15 लाख डिपॉज़िट ज़ब्ती की अनुचित शर्त और ₹25,000 की जबरन पेंटिंग कटौती।'
        },
        summaryBullets: [
          'हर महीने की 3 तारीख तक ₹35,000 किराया देना अनिवार्य है।',
          'भारी सुरक्षा जमा (Security Deposit) ₹15,00,000 जो खाली करने के 90 दिनों बाद मिलेगा।',
          '12 महीने का लॉक-इन: यदि आप पहले निकलते हैं तो मकान मालिक पूरे ₹15 लाख ज़ब्त कर लेगा।',
          'किराया लेट होने पर ₹1,000 प्रतिदिन का भारी जुर्माना।',
          'फ्लैट खाली करते समय बिना किसी कारण ₹25,000 पेंटिंग चार्ज के नाम पर काटा जाएगा।'
        ],
        deadlines: [
          {
            date: 'हर महीने की 3 तारीख',
            description: 'किराया भुगतान की अंतिम तिथि। देरी पर ₹1,000/दिन का जुर्माना लगेगा।',
            urgent: false
          },
          {
            date: 'शुरुआत से 12 महीने',
            description: 'लॉक-इन अवधि समाप्त। इससे पहले खाली करने पर पूरा ₹15 लाख डिपॉज़िट ज़ब्त होगा।',
            urgent: true
          },
          {
            date: 'फ्लैट खाली करने के 90 दिन बाद',
            description: 'डिपॉज़िट वापसी की समयसीमा (जो कि बहुत लंबी है)।',
            urgent: false
          }
        ],
        money: [
          {
            amount: '₹35,000 / महीना',
            description: 'मासिक किराया (3 तारीख तक देय)',
            type: 'Monthly/Recurring'
          },
          {
            amount: '₹15,00,000',
            description: 'सुरक्षा जमा (खाली करने के 90 दिन बाद रिफंडेबल)',
            type: 'Deposit'
          },
          {
            amount: '₹4,500 / महीना',
            description: 'सोसायटी मेंटेनेंस चार्ज (किराएदार द्वारा देय)',
            type: 'Monthly/Recurring'
          },
          {
            amount: '₹1,000 / दिन',
            description: '3 तारीख के बाद लेट पेमेंट का दैनिक जुर्माना',
            type: 'Penalty'
          },
          {
            amount: '₹25,000',
            description: 'फ्लैट छोड़ते समय अनिवार्य पेंटिंग कटौती (दीवार साफ हो तब भी)',
            type: 'Hidden Fee'
          }
        ],
        redFlags: [
          {
            clause: 'If Tenant terminates the lease before 12 months, the entire Security Deposit shall be completely forfeited by the Landlord as liquidated damages.',
            explanation: 'समय से पहले निकलने पर पूरा ₹15 लाख ज़ब्त करना कानूनी और व्यावहारिक रूप से बेहद अनुचित है।',
            severity: 'High',
            whyItMatters: 'यदि आपकी नौकरी बदलती है या इमरजेंसी में शिफ्ट होना पड़ता है, तो आपके ₹15 लाख डूब जाएंगे।'
          },
          {
            clause: 'upon vacating, a non-negotiable deduction of ₹25,000 will be made from the deposit for repainting, regardless of condition.',
            explanation: 'यह एक गुप्त जबरन कटौती है, चाहे दीवारें बिल्कुल नई जैसी ही क्यों न हों।',
            severity: 'Medium',
            whyItMatters: 'आपको अपना पूरा डिपॉज़िट कभी वापस नहीं मिलेगा, ₹25,000 का नुकसान तय है।'
          },
          {
            clause: 'Any rent payment delayed past the 3rd will incur an automatic daily penalty of ₹1,000 per day.',
            explanation: '₹1,000 प्रतिदिन का लेट फाइन बहुत ज्यादा है (महीने का 30,000 तक बन सकता है)।',
            severity: 'Medium',
            whyItMatters: 'सैलरी में 3-4 दिन की देरी होने पर भी आपको ₹3,000-4,000 अतिरिक्त फाइन भरना पड़ेगा।'
          }
        ],
        actions: [
          {
            id: 'act-1',
            task: 'मकान मालिक से लॉक-इन क्लॉज पर बात करें (पूरे डिपॉज़िट के बदले 1 महीने का किराया बतौर पेनाल्टी रखें)।',
            dueDate: 'हस्ताक्षर करने से पहले'
          },
          {
            id: 'act-2',
            task: 'डिपॉज़िट वापसी की अवधि 90 दिनों से घटाकर 15-30 दिन कराने की मांग करें।',
            dueDate: 'हस्ताक्षर करने से पहले'
          },
          {
            id: 'act-3',
            task: 'शिफ्टिंग के पहले दिन फ्लैट की दीवारों और कमरों का वीडियो रिकॉर्ड करके रखें।',
            dueDate: 'शिफ्टिंग वाले दिन'
          },
          {
            id: 'act-4',
            task: 'हर महीने की 1 तारीख का ऑटो-डेबिट सेट करें ताकि ₹1,000/दिन पेनाल्टी न लगे।',
            dueDate: 'महीने की 1 तारीख'
          }
        ],
        suggestedQuestions: [
          'क्या लॉक-इन टूटने पर मकान मालिक पूरा ₹15 लाख वैध रूप से रख सकता है?',
          'दीवारों पर कोई स्क्रैच न होने पर भी क्या ₹25,000 पेंटिंग चार्ज अनिवार्य है?',
          'डिपॉज़िट रिफंड 90 दिनों से कम करवाने के लिए क्या कानूनी नियम हैं?'
        ]
      },
      mr: {
        documentType: 'निवासी भाडे करार (मुंबई उपनगर)',
        oneLiner: 'अंधेरी पश्चिम येथील फ्लॅट 402 चा 12 महिन्यांचा भाडेकरार ज्यात ₹15 लाखांची अनामत रक्कम जप्त होण्याचा गंभीर धोका आहे.',
        verdict: {
          clarityScore: 42,
          recommendation: 'Needs Revision / Do Not Sign Yet',
          reason: '12 महिन्यांच्या आत फ्लॅट सोडल्यास पूर्ण ₹15 लाख डिपॉझिट जप्त करण्याची धोकादायक अट व ₹25,000 ची सक्तीची रंगकाम कपात.'
        },
        summaryBullets: [
          'दर महिन्याच्या 3 तारखेपर्यंत ₹35,000 भाडे भरणे बंधनकारक आहे.',
          'मोठी सुरक्षा अनामत रक्कम ₹15,00,000 जी फ्लॅट सोडल्यानंतर 90 दिवसांनी परत मिळेल.',
          '12 महिन्यांचा लॉक-इन कालावधी: आधी सोडल्यास घरमालक संपूर्ण ₹15 लाख जप्त करेल.',
          'भाडे उशिरा भरल्यास रोज ₹1,000 चा जबर दंड आकारला जाईल.',
          'फ्लॅट सोडताना भिंतींची स्थिती कशीही असली तरी ₹25,000 रंगकामासाठी कापले जातील.'
        ],
        deadlines: [
          {
            date: 'दर महिन्याची 3 तारीख',
            description: 'मासिक भाडे भरण्याची मुदत. उशीर झाल्यास ₹1,000/दिवस दंड.',
            urgent: false
          },
          {
            date: 'सुरुवातीपासून 12 महिने',
            description: 'लॉक-इन कालावधी समाप्त. यापूर्वी सोडल्यास संपूर्ण ₹15 लाख जप्त होतील.',
            urgent: true
          },
          {
            date: 'घर सोडल्यानंतर 90 दिवस',
            description: 'अनामत रक्कम परत मिळण्याची मुदत (फार मोठा कालावधी आहे).',
            urgent: false
          }
        ],
        money: [
          {
            amount: '₹35,000 / महिना',
            description: 'मासिक मूळ भाडे (3 तारखेपूर्वी देय)',
            type: 'Monthly/Recurring'
          },
          {
            amount: '₹15,00,000',
            description: 'परत मिळणारे सुरक्षा डिपॉझिट (90 दिवसांनंतर परत)',
            type: 'Deposit'
          },
          {
            amount: '₹4,500 / महिना',
            description: 'सोसायटी देखभाल खर्च (भाडेकरूने भरायचा)',
            type: 'Monthly/Recurring'
          },
          {
            amount: '₹1,000 / दिवस',
            description: '3 तारखेनंतर भाडे उशिरा भरल्यास दैनंदिन दंड',
            type: 'Penalty'
          },
          {
            amount: '₹25,000',
            description: 'घर सोडताना सक्तीची रंगकाम कपात (भिंती स्वच्छ असल्या तरी)',
            type: 'Hidden Fee'
          }
        ],
        redFlags: [
          {
            clause: 'If Tenant terminates the lease before 12 months, the entire Security Deposit shall be completely forfeited by the Landlord as liquidated damages.',
            explanation: 'मुदतीपूर्वी फ्लॅट सोडल्यास संपूर्ण ₹15 लाख जप्त करणे कायदेशीर व नैतिकदृष्ट्या अतिशय अन्यायकारक आहे.',
            severity: 'High',
            whyItMatters: 'काही कारणास्तव तुम्हाला 8व्या महिन्यात घर सोडावे लागले, तर तुमचे आयुष्यभराचे ₹15 लाख एका झटक्यात बुडू शकतात.'
          },
          {
            clause: 'upon vacating, a non-negotiable deduction of ₹25,000 will be made from the deposit for repainting, regardless of condition.',
            explanation: 'ही एक लपलेली सक्तीची कपात आहे, फ्लॅट कितीही नीटनेटका ठेवला तरी पैसे कापले जातील.',
            severity: 'Medium',
            whyItMatters: 'तुम्हाला तुमची पूर्ण अनामत रक्कम कधीच परत मिळणार नाही, ₹25,000 थेट नुकसान आहे.'
          },
          {
            clause: 'Any rent payment delayed past the 3rd will incur an automatic daily penalty of ₹1,000 per day.',
            explanation: 'रोज ₹1,000 दंड हा प्रमाणाबाहेर जास्त आहे.',
            severity: 'Medium',
            whyItMatters: 'पगार उशिरा झाल्यास किंवा बँकेच्या सुट्ट्यांमुळे 4 दिवसांत ₹4,000 चा दंड सहन करावा लागेल.'
          }
        ],
        actions: [
          {
            id: 'act-1',
            task: 'घरमालकाशी बोलून लॉक-इन दंड एका महिन्याच्या भाड्याइतकाच मर्यादित करा.',
            dueDate: 'स्वाक्षरी करण्यापूर्वी'
          },
          {
            id: 'act-2',
            task: 'डिपॉझिट परतीची मुदत 90 दिवसांवरून 15 ते 30 दिवसांपर्यंत कमी करण्याची मागणी करा.',
            dueDate: 'स्वाक्षरी करण्यापूर्वी'
          },
          {
            id: 'act-3',
            task: 'फ्लॅटमध्ये प्रवेश करताना भिंती आणि सर्व भागांचा व्हिडिओ पुरावा तयार ठेवा.',
            dueDate: 'शिफ्टिंगच्या दिवशी'
          },
          {
            id: 'act-4',
            task: 'दर महिन्याच्या 1 तारखेला बँकेतून ऑटो-डेबिट सुरू करा जेणेकरून दंड टळेल.',
            dueDate: 'महिन्याची 1 तारीख'
          }
        ],
        suggestedQuestions: [
          'लॉक-इन मोडल्यास घरमालक कायदेशीररित्या संपूर्ण ₹15 लाख जप्त करू शकतो का?',
          'भिंतींचे नुकसान नसतानाही ₹25,000 रंगकाम शुल्क कापणे योग्य आहे का?',
          'महाराष्ट्रातील भाडे नियंत्रण कायद्यानुसार अनामत रक्कम परत मिळण्याची मुदत किती असावी?'
        ]
      }
    }
  },
  {
    id: 'college-fee-notice',
    title: '🎓 College Hostel & Fee Circular',
    category: 'University Notice',
    icon: 'GraduationCap',
    badge: 'Urgent Examination Risk',
    recommendedFor: 'student',
    rawText: `SHREE L.R. TIWARI COLLEGE OF ENGINEERING
OFFICIAL NOTICE: TERM 2 FEES & HOSTEL CLEARANCE
Date: 20 October 2026

All final-year students are hereby notified that the second-installment term fee of ₹48,500 must be deposited on or before 25 October 2026.
LATE FINE SCHEDULE:
- Delay up to 3 days: ₹500
- Delay past 7 days: Fine of ₹2,000 and immediate cancellation of hall ticket for upcoming mid-semester examinations.
HOSTEL DUES & DEPOSIT:
All hostellers must submit a clearance no-dues certificate from the warden. A non-refundable utility surcharge of ₹3,500 for monsoon electricity consumption will be debited from the initial security deposit.
MODES OF PAYMENT: Online via portal only. Cash or cheques will NOT be accepted.`,
    precomputedAnalysis: {
      en: {
        documentType: 'College Term Fee & Hostel Circular',
        oneLiner: 'Urgent notice requiring ₹48,500 fee payment by 25 October 2026, or your mid-semester exam hall ticket will be cancelled.',
        verdict: {
          clarityScore: 68,
          recommendation: 'Proceed with Caution',
          reason: 'Tight 5-day deadline with a catastrophic penalty (hall ticket cancellation) plus an unannounced ₹3,500 monsoon utility deduction.'
        },
        summaryBullets: [
          'Second-installment term fee of ₹48,500 must be deposited on or before 25 October 2026.',
          'Delay past 7 days triggers automatic cancellation of mid-semester examination hall tickets.',
          'Late fee tiers: ₹500 for up to 3 days, ₹2,000 for more than 7 days.',
          'Hostel residents face a mandatory ₹3,500 non-refundable deduction from their security deposit.',
          'Payment is strictly online via college portal; no cash or bank cheques accepted.'
        ],
        deadlines: [
          {
            date: '2026-10-25',
            description: 'Final date to pay ₹48,500 term fees without penalty.',
            urgent: true
          },
          {
            date: '2026-10-28',
            description: 'End of 3-day grace period; late fee jumps from ₹500 to ₹2,000.',
            urgent: true
          },
          {
            date: '2026-11-01',
            description: 'Critical cutoff: Hall ticket cancellation for mid-semester exams if fees unpaid.',
            urgent: false
          }
        ],
        money: [
          {
            amount: '₹48,500',
            description: 'Term 2 installment fee due by 25 October',
            type: 'One-time'
          },
          {
            amount: '₹500',
            description: 'Late fine for 1 to 3 days payment delay',
            type: 'Penalty'
          },
          {
            amount: '₹2,000',
            description: 'Late fine for payment delayed past 7 days',
            type: 'Penalty'
          },
          {
            amount: '₹3,500',
            description: 'Monsoon utility surcharge deducted from hostel deposit',
            type: 'Hidden Fee'
          }
        ],
        redFlags: [
          {
            clause: 'Delay past 7 days: Fine of ₹2,000 and immediate cancellation of hall ticket for upcoming mid-semester examinations.',
            explanation: 'Disproportionate penalty that jeopardizes your entire academic semester over an administrative fee delay.',
            severity: 'High',
            whyItMatters: 'If bank servers fail or your parents transfer late, you will be barred from taking exams and could lose a year.'
          },
          {
            clause: 'A non-refundable utility surcharge of ₹3,500 for monsoon electricity consumption will be debited from the initial security deposit.',
            explanation: 'Hostel authorities are unilaterally slashing your refundable deposit without individual meter transparency.',
            severity: 'Medium',
            whyItMatters: 'Your hostel caution deposit is being treated as a revenue stream instead of a refundable guarantee.'
          }
        ],
        actions: [
          {
            id: 'act-1',
            task: 'Log into college online portal and initiate ₹48,500 payment before server rush.',
            dueDate: 'By 24 October 2026'
          },
          {
            id: 'act-2',
            task: 'Download and save payment transaction receipt and digital hall ticket acknowledgment.',
            dueDate: 'Immediately after payment'
          },
          {
            id: 'act-3',
            task: 'Hostellers: Collect and submit warden clearance no-dues certificate.',
            dueDate: 'By 25 October 2026'
          }
        ],
        suggestedQuestions: [
          'Can the college legally cancel my examination hall ticket over fee payment delay?',
          'What happens if the online payment portal fails or shows a pending status?',
          'Can hostel students contest the ₹3,500 monsoon utility surcharge?'
        ]
      },
      hi: {
        documentType: 'कॉलेज टर्म फीस व हॉस्टल सर्कुलर',
        oneLiner: '25 अक्टूबर 2026 तक ₹48,500 फीस जमा करने का जरूरी नोटिस, लेट होने पर मिड-सेम परीक्षा हॉल टिकट रद्द होगा।',
        verdict: {
          clarityScore: 68,
          recommendation: 'Proceed with Caution',
          reason: 'केवल 5 दिनों की बहुत कम समयसीमा और फीस लेट होने पर परीक्षा से वंचित करने का कठोर नियम, साथ ही ₹3,500 की छिपी कटौती।'
        },
        summaryBullets: [
          'अंतिम वर्ष के छात्रों को टर्म-2 की ₹48,500 फीस 25 अक्टूबर 2026 तक जमा करनी होगी।',
          '7 दिन से ज्यादा देरी होने पर मिड-सेमेस्टर परीक्षा का हॉल टिकट तुरंत रद्द कर दिया जाएगा।',
          '3 दिन की देरी पर ₹500 और 7 दिन बाद ₹2,000 का लेट फाइन लगेगा।',
          'हॉस्टल छात्रों के डिपॉज़िट से मानसून बिजली खर्च के नाम पर ₹3,500 सीधे काट लिए जाएंगे।',
          'भुगतान केवल ऑनलाइन पोर्टल से होगा, कैश या चेक स्वीकार नहीं किए जाएंगे।'
        ],
        deadlines: [
          {
            date: '2026-10-25',
            description: 'बिना लेट फीस के ₹48,500 भरने की आखिरी तारीख।',
            urgent: true
          },
          {
            date: '2026-10-28',
            description: '3 दिन की ग्रेस अवधि समाप्त; लेट फाइन ₹500 से बढ़कर ₹2,000 होगा।',
            urgent: true
          },
          {
            date: '2026-11-01',
            description: 'गंभीर अंतिम सीमा: फीस न भरने पर मिड-सेम परीक्षा हॉल टिकट रद्द।',
            urgent: false
          }
        ],
        money: [
          {
            amount: '₹48,500',
            description: 'टर्म-2 की मुख्य कॉलेज फीस (25 अक्टूबर तक)',
            type: 'One-time'
          },
          {
            amount: '₹500',
            description: '1 से 3 दिन की देरी पर लेट फाइन',
            type: 'Penalty'
          },
          {
            amount: '₹2,000',
            description: '7 दिन से अधिक देरी पर लेट फाइन',
            type: 'Penalty'
          },
          {
            amount: '₹3,500',
            description: 'हॉस्टल डिपॉज़िट से काटा जाने वाला मानसून बिजली अधिभार',
            type: 'Hidden Fee'
          }
        ],
        redFlags: [
          {
            clause: 'Delay past 7 days: Fine of ₹2,000 and immediate cancellation of hall ticket for upcoming mid-semester examinations.',
            explanation: 'फीस में थोड़ी देरी के कारण छात्र का हॉल टिकट रद्द करना बहुत कठोर और छात्र-विरोधी कदम है।',
            severity: 'High',
            whyItMatters: 'यदि बैंक सर्वर डाउन रहा या पैसों का इंतज़ाम लेट हुआ, तो आपका पूरा सेमेस्टर और एक साल बर्बाद हो सकता है।'
          },
          {
            clause: 'A non-refundable utility surcharge of ₹3,500 for monsoon electricity consumption will be debited from the initial security deposit.',
            explanation: 'हॉस्टल प्रशासन बिना अलग मीटर रीडिंग के आपके रिफंडेबल डिपॉज़िट से सीधे पैसे काट रहा है।',
            severity: 'Medium',
            whyItMatters: 'डिपॉज़िट जो आपको पूरा वापस मिलना चाहिए था, उसमें से ₹3,500 बिना आपकी सहमति के कट जाएंगे।'
          }
        ],
        actions: [
          {
            id: 'act-1',
            task: 'कॉलेज पोर्टल पर तुरंत लॉगिन करके ₹48,500 का भुगतान करें ताकि अंतिम समय का सर्वर क्रैश न झेलना पड़े।',
            dueDate: '24 अक्टूबर 2026 से पहले'
          },
          {
            id: 'act-2',
            task: 'पेमेंट रसीद और हॉल टिकट कंफर्मेशन की पीडीएफ तुरंत डाउनलोड और सेव करें।',
            dueDate: 'पेमेंट के तुरंत बाद'
          },
          {
            id: 'act-3',
            task: 'हॉस्टल छात्र वार्डन से नो-ड्यूज क्लीयरेंस सर्टिफिकेट लेकर जमा कराएं।',
            dueDate: '25 अक्टूबर 2026 तक'
          }
        ],
        suggestedQuestions: [
          'क्या फीस लेट होने पर कॉलेज हॉल टिकट रद्द कर सकता है? यूजीसी के क्या नियम हैं?',
          'अगर ऑनलाइन पेमेंट फेल हो जाए और अकाउंट से पैसे कट जाएं तो क्या करें?',
          'हॉस्टल के ₹3,500 बिजली सरचार्ज के खिलाफ छात्र संघ में अपील कैसे करें?'
        ]
      },
      mr: {
        documentType: 'कॉलेज सत्र शुल्क व वसतिगृह परिपत्रक',
        oneLiner: '25 ऑक्टोबर 2026 पर्यंत ₹48,500 सत्र शुल्क भरण्याची तातडीची नोटीस, अन्यथा परीक्षा प्रवेशपत्र रद्द होण्याची भीती.',
        verdict: {
          clarityScore: 68,
          recommendation: 'Proceed with Caution',
          reason: 'केवळ 5 दिवसांची मुदत आणि उशीर झाल्यास सत्र परीक्षा प्रवेशपत्र रद्द करण्याची अत्यंत कठोर शिक्षा, तसेच ₹3,500 ची अनपेक्षित कपात.'
        },
        summaryBullets: [
          'अंतिम वर्षाच्या विद्यार्थ्यांना दुसऱ्या सत्राचे शुल्क ₹48,500 दिनांक 25 ऑक्टोबर 2026 पूर्वी भरणे आवश्यक आहे.',
          '7 दिवसांपेक्षा जास्त विलंब झाल्यास सत्र परीक्षा हॉल तिकीट थेट रद्द केले जाईल.',
          'उशिरा भरल्यास दंड: 3 दिवसांपर्यंत ₹500, 7 दिवसांनंतर ₹2,000.',
          'वसतिगृहाच्या अनामत रकमेतून पावसाळी वीज वापरापोटी ₹3,500 थेट कापून घेतले जातील.',
          'शुल्क केवळ कॉलेज पोर्टलवरून ऑनलाइन भरायचे आहे; रोख किंवा धनादेश स्वीकारला जाणार नाही.'
        ],
        deadlines: [
          {
            date: '2026-10-25',
            description: 'कोणत्याही दंडाशिवाय ₹48,500 भरण्याची अंतिम मुदत.',
            urgent: true
          },
          {
            date: '2026-10-28',
            description: '3 दिवसांची सवलत संपेल; दंड ₹500 वरून ₹2,000 होईल.',
            urgent: true
          },
          {
            date: '2026-11-01',
            description: 'महत्त्वाची अंतिम मुदत: शुल्क न भरल्यास परीक्षा हॉल तिकीट रद्द.',
            urgent: false
          }
        ],
        money: [
          {
            amount: '₹48,500',
            description: 'सत्र 2 चे मुख्य कॉलेज शुल्क (25 ऑक्टोबरपर्यंत)',
            type: 'One-time'
          },
          {
            amount: '₹500',
            description: '1 ते 3 दिवसांच्या विलंबासाठी दंड',
            type: 'Penalty'
          },
          {
            amount: '₹2,000',
            description: '7 दिवसांपेक्षा जास्त विलंबासाठी दंड',
            type: 'Penalty'
          },
          {
            amount: '₹3,500',
            description: 'हॉस्टेल डिपॉझिटमधून परस्पर कापले जाणारे वीज अधिभार शुल्क',
            type: 'Hidden Fee'
          }
        ],
        redFlags: [
          {
            clause: 'Delay past 7 days: Fine of ₹2,000 and immediate cancellation of hall ticket for upcoming mid-semester examinations.',
            explanation: 'शुल्काच्या किरकोळ विलंबासाठी विद्यार्थ्याचे परीक्षा हॉल तिकीट रद्द करणे शैक्षणिकदृष्ट्या अतिशय अन्यायकारक आहे.',
            severity: 'High',
            whyItMatters: 'तांत्रिक अडचणीमुळे पैसे वेळेत न पोचल्यास तुमचे संपूर्ण वर्ष धोक्यात येऊ शकते.'
          },
          {
            clause: 'A non-refundable utility surcharge of ₹3,500 for monsoon electricity consumption will be debited from the initial security deposit.',
            explanation: 'कोणतेही स्वतंत्र मीटर रीडिंग न दाखवता अनामत रकमेतून परस्पर पैसे कापणे चुकीचे आहे.',
            severity: 'Medium',
            whyItMatters: 'परत मिळणाऱ्या अनामत रकमेतून ₹3,500 कायमचे वजा होतील.'
          }
        ],
        actions: [
          {
            id: 'act-1',
            task: 'कॉलेज पोर्टलवर जाऊन शेवटच्या क्षणी होणारा सर्व्हरचा ताण टाळण्यासाठी आजच ₹48,500 भरा.',
            dueDate: '24 ऑक्टोबर 2026 पूर्वी'
          },
          {
            id: 'act-2',
            task: 'पेमेंट पावती व हॉल तिकीट नोंदणीची प्रत तात्काळ डाऊनलोड करून सेव्ह करा.',
            dueDate: 'पेमेंट झाल्यानंतर लगेच'
          },
          {
            id: 'act-3',
            task: 'वसतिगृहातील विद्यार्थ्यांनी वॉर्डनकडून ना-हरकत प्रमाणपत्र (No Dues) जमा करावे.',
            dueDate: '25 ऑक्टोबर 2026 पर्यंत'
          }
        ],
        suggestedQuestions: [
          'शुल्क विलंबापोटी कॉलेज परीक्षा हॉल तिकीट कायदेशीररित्या रोखू शकते का?',
          'ऑनलाइन पैसे कापले गेले पण पोर्टलवर अपडेट झाले नाहीत तर तात्काळ कोणाशी संपर्क साधावा?',
          'वसतिगृहाच्या ₹3,500 वीज अधिभाराबाबत तक्रार कुठे करावी?'
        ]
      }
    }
  },
  {
    id: 'msedcl-bill-notice',
    title: '⚡ Electricity Disconnection Notice',
    category: 'Utility Notice',
    icon: 'Zap',
    badge: 'Immediate Disconnection Threat',
    recommendedFor: 'citizen',
    rawText: `MAHARASHTRA STATE ELECTRICITY DISTRIBUTION CO. LTD. (MSEDCL)
URGENT DISCONNECTION NOTICE U/S 56(1) OF ELECTRICITY ACT 2003

Consumer No: 015284930192 | Name: Priya Nair | Bill Month: September 2026
Outstanding Amount Payable: ₹8,420 | Due Date: 12 October 2026 (OVERDUE)

TAKE NOTICE that your electricity supply line will be DISCONNECTED without further notice on 24 October 2026 if the outstanding dues along with a late surcharge fee of ₹450 are not cleared online or at authorized billing counters.
RECONNECTION CHARGES: Reconnection post-disconnection will require a fee of ₹1,200 and an updated security deposit of ₹3,000.`,
    precomputedAnalysis: {
      en: {
        documentType: 'MSEDCL Electricity Disconnection Notice u/s 56(1)',
        oneLiner: 'Urgent power cut notice: pay overdue ₹8,870 (bill + surcharge) by 24 October 2026 to prevent supply disconnection.',
        verdict: {
          clarityScore: 82,
          recommendation: 'Safe to Sign/Proceed',
          reason: 'Official statutory notice under Electricity Act 2003; total amount and disconnection date are clearly stated.'
        },
        summaryBullets: [
          'Outstanding electricity bill of ₹8,420 is already past due since 12 October 2026.',
          'Power line will be physically disconnected on 24 October 2026 without further warnings.',
          'Immediate payable amount is ₹8,870 (includes ₹450 late surcharge).',
          'Getting reconnected after disconnection will cost an additional ₹4,200 (₹1,200 fee + ₹3,000 security deposit).',
          'Payments can be cleared immediately on the MSEDCL website/app or authorized billing counters.'
        ],
        deadlines: [
          {
            date: '2026-10-12',
            description: 'Original bill due date (already OVERDUE).',
            urgent: true
          },
          {
            date: '2026-10-24',
            description: 'FINAL DISCONNECTION DATE. Electricity supply disconnected without further notice.',
            urgent: true
          }
        ],
        money: [
          {
            amount: '₹8,420',
            description: 'Original overdue electricity bill amount for September 2026',
            type: 'One-time'
          },
          {
            amount: '₹450',
            description: 'Late payment surcharge fee',
            type: 'Penalty'
          },
          {
            amount: '₹1,200',
            description: 'Reconnection charge payable only if disconnected',
            type: 'Penalty'
          },
          {
            amount: '₹3,000',
            description: 'Updated security deposit demand required to restore supply post-disconnection',
            type: 'Deposit'
          }
        ],
        redFlags: [
          {
            clause: 'TAKE NOTICE that your electricity supply line will be DISCONNECTED without further notice on 24 October 2026',
            explanation: 'Physical line disconnection is irreversible without heavy bureaucratic restoration delays.',
            severity: 'High',
            whyItMatters: 'If disconnected, your flat will remain without power for 2-4 days while reconnection processing takes place.'
          },
          {
            clause: 'Reconnection post-disconnection will require a fee of ₹1,200 and an updated security deposit of ₹3,000.',
            explanation: 'Missing the 24 Oct deadline inflates your payment burden from ₹8,870 up to ₹13,070 instantly.',
            severity: 'Medium',
            whyItMatters: 'An extra ₹4,200 out of pocket purely in administrative penalty and additional deposit lockup.'
          }
        ],
        actions: [
          {
            id: 'act-1',
            task: 'Pay ₹8,870 immediately via Mahavitaran/MSEDCL mobile app or UPI.',
            dueDate: 'Before 24 October 2026'
          },
          {
            id: 'act-2',
            task: 'Take screenshot of payment success receipt showing Consumer No: 015284930192.',
            dueDate: 'Immediately after payment'
          },
          {
            id: 'act-3',
            task: 'If visiting lineman arrives on 24th, show digital receipt to prevent meter disconnection.',
            dueDate: '24 October 2026'
          }
        ],
        suggestedQuestions: [
          'How can I pay MSEDCL online immediately using UPI or credit card?',
          'What happens if I pay on the morning of 24 October? Will the lineman still cut power?',
          'Can I challenge the ₹450 surcharge if previous bill was delivered late?'
        ]
      },
      hi: {
        documentType: 'महावितरण (MSEDCL) बिजली विच्छेदन नोटिस धारा 56(1)',
        oneLiner: 'अति आवश्यक बिजली कटने का नोटिस: 24 अक्टूबर 2026 से पहले बकाया ₹8,870 भरें वरना बिजली काट दी जाएगी।',
        verdict: {
          clarityScore: 82,
          recommendation: 'Safe to Sign/Proceed',
          reason: 'बिजली अधिनियम 2003 के तहत आधिकारिक वैधानिक नोटिस; बकाया राशि और डिस्कनेक्शन की तारीख स्पष्ट रूप से दी गई है।'
        },
        summaryBullets: [
          'सितंबर महीने का ₹8,420 का बिजली बिल 12 अक्टूबर से बकाया (Overdue) है।',
          '24 अक्टूबर 2026 को बिना किसी पूर्व सूचना के बिजली लाइन काट दी जाएगी।',
          'वर्तमान में देय कुल राशि ₹8,870 है (जिसमें ₹450 लेट सरचार्ज शामिल है)।',
          'यदि लाइन कट गई तो दोबारा जुड़वाने के लिए ₹4,200 अतिरिक्त लगेंगे (₹1,200 शुल्क + ₹3,000 नया डिपॉज़िट)।',
          'भुगतान महावितरण की आधिकारिक वेबसाइट, ऐप या अधिकृत बिलिंग काउंटर पर तुरंत किया जा सकता है।'
        ],
        deadlines: [
          {
            date: '2026-10-12',
            description: 'बिल भरने की मूल अंतिम तारीख (जो पहले ही निकल चुकी है)।',
            urgent: true
          },
          {
            date: '2026-10-24',
            description: 'बिजली कटने की अंतिम तिथि। बिना नोटिस बिजली कनेक्शन काटा जाएगा।',
            urgent: true
          }
        ],
        money: [
          {
            amount: '₹8,420',
            description: 'सितंबर 2026 का मूल बकाया बिजली बिल',
            type: 'One-time'
          },
          {
            amount: '₹450',
            description: 'लेट पेमेंट सरचार्ज (जुर्माना)',
            type: 'Penalty'
          },
          {
            amount: '₹1,200',
            description: 'लाइन कटने के बाद दोबारा जोड़ने का शुल्क (Reconnection)',
            type: 'Penalty'
          },
          {
            amount: '₹3,000',
            description: 'पुनः कनेक्शन के लिए अतिरिक्त अनिवार्य सुरक्षा जमा',
            type: 'Deposit'
          }
        ],
        redFlags: [
          {
            clause: 'TAKE NOTICE that your electricity supply line will be DISCONNECTED without further notice on 24 October 2026',
            explanation: 'बिजली कटने के बाद दोबारा चालू करवाने में सरकारी प्रक्रिया के कारण 2 से 4 दिन लग सकते हैं।',
            severity: 'High',
            whyItMatters: 'घर में अंधेरा हो जाएगा और फ्रिज, पंखा, पढ़ाई सब बाधित होगी।'
          },
          {
            clause: 'Reconnection post-disconnection will require a fee of ₹1,200 and an updated security deposit of ₹3,000.',
            explanation: '24 तारीख चूकने पर आपका कुल खर्च ₹8,870 से सीधे बढ़कर ₹13,070 हो जाएगा।',
            severity: 'Medium',
            whyItMatters: 'केवल देरी की वजह से ₹4,200 का अतिरिक्त आर्थिक नुकसान होगा।'
          }
        ],
        actions: [
          {
            id: 'act-1',
            task: 'महावितरण ऐप या यूपीआई (Google Pay/PhonePe) से ₹8,870 का तुरंत भुगतान करें।',
            dueDate: '24 अक्टूबर 2026 से पहले'
          },
          {
            id: 'act-2',
            task: 'उपभोक्ता नंबर 015284930192 वाला भुगतान रसीद का स्क्रीनशॉट अपने फोन में सुरक्षित रखें।',
            dueDate: 'भुगतान के तुरंत बाद'
          },
          {
            id: 'act-3',
            task: 'यदि 24 तारीख को लाइनमैन मीटर काटने आए, तो उसे तुरंत डिजिटल रसीद दिखाएं।',
            dueDate: '24 अक्टूबर 2026'
          }
        ],
        suggestedQuestions: [
          'महावितरण का बिजली बिल UPI से तुरंत कैसे भरें?',
          'क्या 24 अक्टूबर की सुबह बिल भरने पर भी बिजली कटने का खतरा रहता है?',
          'अगर पुराना बिल मिला ही नहीं था तो क्या ₹450 लेट सरचार्ज माफ हो सकता है?'
        ]
      },
      mr: {
        documentType: 'महावितरण (MSEDCL) वीज पुरवठा खंडित नोटीस कलम 56(1)',
        oneLiner: 'अतितातडीची वीज तोडणी नोटीस: 24 ऑक्टोबर 2026 पूर्वी थकीत ₹8,870 भरा अन्यथा वीज पुरवठा त्वरित खंडित केला जाईल.',
        verdict: {
          clarityScore: 82,
          recommendation: 'Safe to Sign/Proceed',
          reason: 'विद्युत कायदा 2003 अंतर्गत अधिकृत कायदेशीर नोटीस; थकीत रक्कम आणि वीज तोडण्याची तारीख अगदी स्पष्ट आहे.'
        },
        summaryBullets: [
          'सप्टेंबर महिन्याचे ₹8,420 वीजबिल 12 ऑक्टोबरपासून थकीत आहे.',
          'दिनांक 24 ऑक्टोबर 2026 रोजी कोणतीही पूर्वसूचना न देता वीज पुरवठा खंडित करण्यात येईल.',
          'सध्या भरावयाची एकूण रक्कम ₹8,870 आहे (यात ₹450 विलंब अधिभार समाविष्ट आहे).',
          'वीज कापल्यास पुनर्जोडणीसाठी ₹4,200 अतिरिक्त भरावे लागतील (₹1,200 शुल्क + ₹3,000 नवी अनामत).',
          'महावितरणच्या वेबसाइटवर किंवा मोबाईल ॲपद्वारे त्वरित ऑनलाइन पेमेंट करता येईल.'
        ],
        deadlines: [
          {
            date: '2026-10-12',
            description: 'वीजबिल भरण्याची मूळ अंतिम तारीख (थकीत झाली आहे).',
            urgent: true
          },
          {
            date: '2026-10-24',
            description: 'वीज तोडणीची अंतिम तारीख. कोणतीही नोटीस न देता वीज पुरवठा बंद होईल.',
            urgent: true
          }
        ],
        money: [
          {
            amount: '₹8,420',
            description: 'सप्टेंबर 2026 चे मूळ थकीत वीजबिल',
            type: 'One-time'
          },
          {
            amount: '₹450',
            description: 'विलंब अधिभार दंड (Late Surcharge)',
            type: 'Penalty'
          },
          {
            amount: '₹1,200',
            description: 'वीज कापल्यानंतर पुनर्जोडणी शुल्क (Reconnection Fee)',
            type: 'Penalty'
          },
          {
            amount: '₹3,000',
            description: 'पुन्हा वीज सुरू करण्यासाठी अद्ययावत सुरक्षा ठेव (Deposit)',
            type: 'Deposit'
          }
        ],
        redFlags: [
          {
            clause: 'TAKE NOTICE that your electricity supply line will be DISCONNECTED without further notice on 24 October 2026',
            explanation: 'वीज तोडल्यानंतर ती पूर्ववत सुरू करण्यासाठी शासकीय दिरंगाईमुळे 2 ते 4 दिवस अंधारात राहावे लागू शकते.',
            severity: 'High',
            whyItMatters: 'घरातील दैनंदिन कामे, अभ्यास आणि उपकरणांचा वापर ठप्प होईल.'
          },
          {
            clause: 'Reconnection post-disconnection will require a fee of ₹1,200 and an updated security deposit of ₹3,000.',
            explanation: '24 तारीख चुकल्यास बिलाचा बोजा थेट ₹8,870 वरून ₹13,070 वर पोहोचेल.',
            severity: 'Medium',
            whyItMatters: 'केवळ दिरंगाईमुळे ₹4,200 चा नाहक भुर्दंड सोसावा लागेल.'
          }
        ],
        actions: [
          {
            id: 'act-1',
            task: 'महावितरण ॲप किंवा यूपीआयद्वारे (GPay/PhonePe) ₹8,870 तात्काळ भरा.',
            dueDate: '24 ऑक्टोबर 2026 पूर्वी'
          },
          {
            id: 'act-2',
            task: 'ग्राहक क्रमांक 015284930192 दिसणारी पेमेंट पावती मोबाईलमध्ये सेव्ह ठेवा.',
            dueDate: 'पेमेंटनंतर लगेच'
          },
          {
            id: 'act-3',
            task: '24 तारखेला वायरमन वीज कापायला आल्यास त्याला त्वरित डिजिटल पावती दाखवा.',
            dueDate: '24 ऑक्टोबर 2026'
          }
        ],
        suggestedQuestions: [
          'महावितरण ॲपवरून यूपीआय द्वारे तत्काळ वीजबिल कसे भरावे?',
          '24 ऑक्टोबरच्या सकाळी बिल भरल्यास वीज कापली जाण्याचा धोका टळतो का?',
          'विलंब शुल्काबाबत महावितरणच्या ग्राहक केंद्रात तक्रार कशी करावी?'
        ]
      }
    }
  }
];
