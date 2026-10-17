export interface DialogueLine {
  chapterTitle?: string;
  speaker: string;
  text: string;
  bg: 'meadow' | 'training_grounds' | 'surreal_storm' | 'fairy_village' | 'flower_field_door' | 'fairy_street' | 'wind_cliff' | 'fairy_forest' | 'sea_sunset' | 'cliff_proposal' | 'wedding_beach';
  knightPose: 'idle' | 'training' | 'hero' | 'blush' | 'knee' | 'none' | 'struggle' | 'sword_ground' | 'crying' | 'naked' | 'crying_naked' | 'knee_naked';
  fairyPose?: 'idle' | 'hover' | 'happy' | 'sparkle' | 'surprised' | 'love' | 'none' | 'no_wings' | 'surprised_no_wings' | 'happy_no_wings';
  apprenticePose?: 'idle' | 'training' | 'strike' | 'proud' | 'none';
  ambient: 'petals' | 'wind' | 'magic' | 'sunset_sparkles' | 'hearts' | 'storm' | 'fireworks';
  bgm: 'routine' | 'wind' | 'wings' | 'sunset';
  isProposal?: boolean;
  showRing?: boolean;
  showGauntletFly?: boolean;
}

export const STORY_CHAPTERS: { title: string; lines: DialogueLine[] }[] = [
  {
    title: 'Глава 1. Що було після?',
    lines: [
      {
        chapterTitle: 'ГЛАВА 1: ЩО БУЛО ПІСЛЯ?',
        speaker: 'Оповідач',
        text: 'Ранок на узбережжі пахнув солоною водою, сушеною лавандою і свіжоспеченим хлібом з хрусткою золотистою скоринкою.',
        bg: 'meadow',
        knightPose: 'idle',
        fairyPose: 'hover',
        ambient: 'petals',
        bgm: 'routine'
      },
      {
        speaker: 'Оповідач',
        text: 'У затишному дерев’яному будиночку біля самого моря сонячні зайчики танцювали по кутах.',
        bg: 'meadow',
        knightPose: 'idle',
        fairyPose: 'hover',
        ambient: 'petals',
        bgm: 'routine'
      },
      {
        speaker: 'Оповідач',
        text: 'У кутку біля дверей стояли поліровані лицарські обладунки. Тепер вони не збирали дорожній пил і не брязкали від тривожних походів...',
        bg: 'meadow',
        knightPose: 'idle',
        fairyPose: 'hover',
        ambient: 'petals',
        bgm: 'routine'
      },
      {
        speaker: 'Оповідач',
        text: '...на їхньому сталевому плечі Фея сушила букетики ромашок та м\'яти, а шолом іноді слугував кошиком для свіжих персиків.',
        bg: 'meadow',
        knightPose: 'idle',
        fairyPose: 'sparkle',
        ambient: 'petals',
        bgm: 'routine'
      },
      {
        speaker: 'Оповідач',
        text: 'Лицар сидів на дерев’яній веранді, мружачись від лагідного сонця. Його спина, колись скута залізом і звичкою тримати удари долі, була повністю розслаблена.',
        bg: 'meadow',
        knightPose: 'naked',
        fairyPose: 'hover',
        ambient: 'petals',
        bgm: 'routine'
      },
      {
        speaker: 'Оповідач',
        text: 'Він пив чай і спостерігав, як над садом кружляє Фея. Її величні білі крила тихо шелестіли на вітрі, піднімаючи легкий квітковий вихор.',
        bg: 'meadow',
        knightPose: 'naked',
        fairyPose: 'hover',
        ambient: 'petals',
        bgm: 'routine'
      },
      {
        speaker: 'Оповідач',
        text: 'Вона спустилася просто до нього на коліна, склала свої невагомі крила за спиною і притулилася прохолодною щокою до його шиї.',
        bg: 'meadow',
        knightPose: 'naked',
        fairyPose: 'love',
        ambient: 'petals',
        bgm: 'routine'
      },
      {
        speaker: 'Фея',
        text: '— Доброго ранку, мій лицарю, — прошепотіла вона, зариваючись пальцями в його чуприну.',
        bg: 'meadow',
        knightPose: 'naked',
        fairyPose: 'love',
        ambient: 'petals',
        bgm: 'routine'
      },
      {
        speaker: 'Лицар',
        text: '— Доброго ранку, моя маленька буре, — посміхнувся він, обіймаючи її обома руками — теплими, живими, без жодної залізної рукавиці між ними.',
        bg: 'meadow',
        knightPose: 'naked',
        fairyPose: 'love',
        ambient: 'petals',
        bgm: 'routine'
      },
      {
        speaker: 'Оповідач',
        text: 'Вони довго сиділи мовчки, слухаючи мірний плескіт морських хвиль. Їм більше нікуди не треба було поспішати. Більше ніхто з них не боровся наодинці зі світом.',
        bg: 'meadow',
        knightPose: 'naked',
        fairyPose: 'love',
        ambient: 'petals',
        bgm: 'routine'
      },
      {
        speaker: 'Оповідач',
        text: 'Але щоб опинитися тут, на цьому березі, кожному з них колись довелося пройти крізь свої власні, непохитні двері.',
        bg: 'meadow',
        knightPose: 'naked',
        fairyPose: 'love',
        ambient: 'petals',
        bgm: 'routine'
      }
    ]
  },
  {
    title: 'Глава 2. Присяга',
    lines: [
      {
        chapterTitle: 'ГЛАВА 2: ПРИСЯГА',
        speaker: 'Оповідач',
        text: 'Лицарська присяга — важлива подія для кожного юнака, який обрав цей тернистий шлях.',
        bg: 'training_grounds',
        knightPose: 'idle',
        apprenticePose: 'training',
        ambient: 'petals',
        bgm: 'routine'
      },
      {
        speaker: 'Оповідач',
        text: 'Сьогодні Лицар проводив екзамен для охочих і запальних молодих хлопців.',
        bg: 'training_grounds',
        knightPose: 'idle',
        apprenticePose: 'training',
        ambient: 'petals',
        bgm: 'routine'
      },
      {
        speaker: 'Оповідач',
        text: 'У його думках вирував неспокій за одного хлопчака, який так сильно старався, піт заливав очі, пальці стиралися об дерев\'яне руків’я...',
        bg: 'training_grounds',
        knightPose: 'idle',
        apprenticePose: 'training',
        ambient: 'petals',
        bgm: 'routine'
      },
      {
        speaker: 'Оповідач',
        text: '...але він так і не зміг витримати фінального натиску і скласти іспит.',
        bg: 'training_grounds',
        knightPose: 'idle',
        apprenticePose: 'idle',
        ambient: 'petals',
        bgm: 'routine'
      },
      {
        speaker: 'Лицар',
        text: '— Ти зможеш підкорити світ, малий! — підбадьорив Лицар учня, поклавши важку долоню йому на плече.',
        bg: 'training_grounds',
        knightPose: 'hero',
        apprenticePose: 'idle',
        ambient: 'petals',
        bgm: 'routine'
      },
      {
        speaker: 'Лицар',
        text: '— Якби ж тільки я міг... вберегти тебе від цієї важкості, — тихо пробрав він собі під ніс.',
        bg: 'training_grounds',
        knightPose: 'blush',
        apprenticePose: 'idle',
        ambient: 'petals',
        bgm: 'routine'
      },
      {
        speaker: 'Оповідач',
        text: 'Юнак далі завзято тренувався, не забуваючи слів наставника, і лише думав: «Цікаво, а в мого вчителя був той, ким він приходиться мені?»',
        bg: 'training_grounds',
        knightPose: 'idle',
        apprenticePose: 'training',
        ambient: 'petals',
        bgm: 'routine'
      },
      {
        speaker: 'Оповідач',
        text: 'Малий так і махав мечем до кінця дня, у голові витала мрія про лицарство і можливість показати себе світові.',
        bg: 'training_grounds',
        knightPose: 'none',
        apprenticePose: 'training',
        ambient: 'petals',
        bgm: 'routine'
      },
      {
        speaker: 'Оповідач',
        text: 'Лицар повернувся додому, але як тільки відчинив двері своєї оселі, реальність розчинилася. Його огорнуло надсильним вітром.',
        bg: 'surreal_storm',
        knightPose: 'struggle',
        ambient: 'storm',
        bgm: 'wind'
      },
      {
        speaker: 'Оповідач',
        text: 'Попереду не було стін — лише безкрає, ідеально рівне поле, ніби зі штучно вистриженим газоном, червоне сонце, що наполовину заховалося за обрій, і самотні двері.',
        bg: 'surreal_storm',
        knightPose: 'struggle',
        ambient: 'storm',
        bgm: 'wind'
      },
      {
        speaker: 'Оповідач',
        text: 'Вони стосувалися землі просто серед трав і були абсолютно нерухомими.',
        bg: 'surreal_storm',
        knightPose: 'struggle',
        ambient: 'storm',
        bgm: 'wind'
      },
      {
        speaker: 'Лицар',
        text: '«Дивні двері... Чому вони тут? Чому від такого вітру вони абсолютно не хитаються? Скільки вони тут стоять?»',
        bg: 'surreal_storm',
        knightPose: 'struggle',
        ambient: 'storm',
        bgm: 'wind'
      },
      {
        speaker: 'Оповідач',
        text: 'Вітер бив з лютою силою, штовхаючи назад, ніби сам диявол упирався в залізні груди. Лицаря почало здувати.',
        bg: 'surreal_storm',
        knightPose: 'struggle',
        ambient: 'storm',
        bgm: 'wind'
      },
      {
        speaker: 'Лицар',
        text: '«Якби не мої обладунки, мене б тут більше не було!» — пробило думку глибше за шкіру і плоть.',
        bg: 'surreal_storm',
        knightPose: 'struggle',
        ambient: 'storm',
        bgm: 'wind'
      },
      {
        speaker: 'Оповідач',
        text: 'Лицар зробив крок назад. Вітер ставав лише сильнішим. За спиною вже клубочилася чорна гроза, блискавки били в землю, а попереду не було жодної хмаринки — лише ті кляті, спокійні двері.',
        bg: 'surreal_storm',
        knightPose: 'struggle',
        ambient: 'storm',
        bgm: 'wind'
      },
      {
        speaker: 'Лицар',
        text: '— Меч! — вигукнув він.',
        bg: 'surreal_storm',
        knightPose: 'sword_ground',
        ambient: 'storm',
        bgm: 'wind'
      },
      {
        speaker: 'Оповідач',
        text: 'Відточеним до ідеалу рухом Лицар вихопив клинок і з усього розмаху встромив його в землю перед собою. Вітер шепотів, ніби лагідним голосом, але цей шепіт ніс у собі смертельний страх зробити невірний крок.',
        bg: 'surreal_storm',
        knightPose: 'sword_ground',
        ambient: 'storm',
        bgm: 'wind'
      },
      {
        speaker: 'Лицар',
        text: '— Треба переставити меч! Куди? Бачу!',
        bg: 'surreal_storm',
        knightPose: 'sword_ground',
        ambient: 'storm',
        bgm: 'wind'
      },
      {
        speaker: 'Лицар',
        text: '— Моя броня зараз і мій порятунок, і моє прокляття, ха-ха!',
        bg: 'surreal_storm',
        knightPose: 'sword_ground',
        ambient: 'storm',
        bgm: 'wind'
      },
      {
        speaker: 'Лицар',
        text: '— Я можу! Я тут лицар! Ти не дістанеш мене, грозо!',
        bg: 'surreal_storm',
        knightPose: 'struggle',
        ambient: 'storm',
        bgm: 'wind'
      },
      {
        speaker: 'Оповідач',
        text: 'Лишився один рух. Але важка залізна рукавиця була надто грубою, щоб намацати тонку клямку.',
        bg: 'surreal_storm',
        knightPose: 'struggle',
        ambient: 'storm',
        bgm: 'wind'
      },
      {
        speaker: 'Оповідач',
        text: 'Зціпивши зуби до болю, Лицар зірвав ремені й скинув металеву рукавицю — її тут же підхопило вихором і понесло в чорне жерло бурі. Голою, живою рукою він ухопився за ручку дверей.',
        bg: 'surreal_storm',
        knightPose: 'struggle',
        ambient: 'storm',
        bgm: 'wind',
        showGauntletFly: true
      },
      {
        speaker: 'Оповідач',
        text: 'У ту ж мить вітер стих. Настала дзвінка тиша. Лицар розчахнув двері, ступив уперед і... знову вийшов на своє тренувальне поле. Там на нього вже чекав трохи знудьгований учень.',
        bg: 'training_grounds',
        knightPose: 'hero',
        apprenticePose: 'idle',
        ambient: 'petals',
        bgm: 'routine'
      },
      {
        speaker: 'Лицар',
        text: '— Почнемо екзамен, хлопче?',
        bg: 'training_grounds',
        knightPose: 'hero',
        apprenticePose: 'idle',
        ambient: 'petals',
        bgm: 'routine'
      },
      {
        speaker: 'Учень',
        text: '— Так, лицарю!',
        bg: 'training_grounds',
        knightPose: 'hero',
        apprenticePose: 'strike',
        ambient: 'petals',
        bgm: 'routine'
      },
      {
        speaker: 'Оповідач',
        text: 'Хлопчина зробив випад і ледь не вибив меч із рук розгубленого наставника.',
        bg: 'training_grounds',
        knightPose: 'hero',
        apprenticePose: 'strike',
        ambient: 'petals',
        bgm: 'routine'
      },
      {
        speaker: 'Лицар',
        text: '— Горджуся тобою, малий! — видихнув Лицар із щирою посмішкою. — Ще ніхто такого не досягав у мене. Ти найсильніший учень, якого бачив світ.',
        bg: 'training_grounds',
        knightPose: 'hero',
        apprenticePose: 'proud',
        ambient: 'petals',
        bgm: 'routine'
      },
      {
        speaker: 'Лицар',
        text: '— Я полишив у житті багато: знайомих, бажання, спогади, врешті-решт, рукавицю...',
        bg: 'training_grounds',
        knightPose: 'blush',
        apprenticePose: 'proud',
        ambient: 'petals',
        bgm: 'routine'
      },
      {
        speaker: 'Учень',
        text: '— Ви багато змогли, лицарю! Пройшли крізь вітри й грози заради того, що маєте зараз.',
        bg: 'training_grounds',
        knightPose: 'blush',
        apprenticePose: 'proud',
        ambient: 'petals',
        bgm: 'routine'
      },
      {
        speaker: 'Оповідач',
        text: 'Лицар опустив меч і вперше за багато років заплакав. Він згадав, як важко йому було відпускати минуле, як він завжди захищав усіх навколо — горою стояв за побратимів у битвах, беріг кожен жарт і кожну хлібину.',
        bg: 'training_grounds',
        knightPose: 'crying',
        apprenticePose: 'proud',
        ambient: 'petals',
        bgm: 'routine'
      },
      {
        speaker: 'Оповідач',
        text: '«Ніяка броня не рятує від щирої теплоти. Холод вона стримає, але він же її і зруйнує». Він скинув решту лат. Він не вбивав драконів, але серед тих, кого любив, він був тим самим лицарем із казок.',
        bg: 'training_grounds',
        knightPose: 'crying_naked',
        apprenticePose: 'proud',
        ambient: 'petals',
        bgm: 'routine'
      }
    ]
  },
  {
    title: 'Глава 3. Крила',
    lines: [
      {
        chapterTitle: 'ГЛАВА 3: КРИЛА',
        speaker: 'Оповідач',
        text: 'У сусідньому чарівному селищі фей дні минали в турботах. Там жила маленька фея.',
        bg: 'fairy_village',
        knightPose: 'none',
        fairyPose: 'no_wings',
        ambient: 'magic',
        bgm: 'wings'
      },
      {
        speaker: 'Оповідач',
        text: 'Її ровесниці вже давно весело пурхали в небі, струшуючи золотий пилок на квіти, а вона ніби й доросла до того віку, щоб отримати крила, але спина лишалася порожньою.',
        bg: 'fairy_village',
        knightPose: 'none',
        fairyPose: 'no_wings',
        ambient: 'magic',
        bgm: 'wings'
      },
      {
        speaker: 'Оповідач',
        text: 'Вона намагалася бути найкращою для всіх: мирила сусідів, збирала ягоди для старих, плела вінки й розв\'язувала чужі негаразди, геть забуваючи про себе.',
        bg: 'fairy_village',
        knightPose: 'none',
        fairyPose: 'no_wings',
        ambient: 'magic',
        bgm: 'wings'
      },
      {
        speaker: 'Оповідач',
        text: 'Знову вигорівши дотла, вона прийшла у своє улюблене поле — поплакати й поговорити сама з собою.',
        bg: 'flower_field_door',
        knightPose: 'none',
        fairyPose: 'no_wings',
        ambient: 'magic',
        bgm: 'wings'
      },
      {
        speaker: 'Оповідач',
        text: 'І раптом посеред трав вона побачила прості дерев’яні двері з гарним віночком із сухоцвітів.',
        bg: 'flower_field_door',
        knightPose: 'none',
        fairyPose: 'no_wings',
        ambient: 'magic',
        bgm: 'wings'
      },
      {
        speaker: 'Оповідач',
        text: 'Фея підбігла, стукала кулачками, смикала клямку — марно, двері стояли намертво.',
        bg: 'flower_field_door',
        knightPose: 'none',
        fairyPose: 'no_wings',
        ambient: 'magic',
        bgm: 'wings'
      },
      {
        speaker: 'Оповідач',
        text: 'Аж раптом із щілини їй просто в тремтячі руки впав пожовклий аркушик. На ньому дрібним почерком було виведено:',
        bg: 'flower_field_door',
        knightPose: 'none',
        fairyPose: 'no_wings',
        ambient: 'magic',
        bgm: 'wings'
      },
      {
        speaker: 'Оповідач',
        text: '«Хочеш крила — дотримуйся правил:\n1. Важко? Звернися по допомогу до інших\n2. Не цікаво, чи не подобається - покинь цю справу\n3. Не маєш більше сил? Зупинись і відпочинь\n4. Не отримуєш подяки - не допомагай\n5. Хочеш крила - думай про себе»',
        bg: 'flower_field_door',
        knightPose: 'none',
        fairyPose: 'no_wings',
        ambient: 'magic',
        bgm: 'wings'
      },
      {
        speaker: 'Фея',
        text: '— Як це так? — дивувалася вона крізь сльози. — Як я маю це все виконувати?! Все життя мене вчили протилежного!',
        bg: 'flower_field_door',
        knightPose: 'none',
        fairyPose: 'no_wings',
        ambient: 'magic',
        bgm: 'wings'
      },
      {
        speaker: 'Оповідач',
        text: 'Але вона втомилася страждати. Поступово фея почала пробувати.',
        bg: 'flower_field_door',
        knightPose: 'none',
        fairyPose: 'no_wings',
        ambient: 'magic',
        bgm: 'wings'
      },
      {
        speaker: 'Оповідач',
        text: 'Їй запропонували шити безглузді мішки, які їй не подобалися — вона чемно відмовилася (Правило 2).',
        bg: 'fairy_village',
        knightPose: 'none',
        fairyPose: 'no_wings',
        ambient: 'magic',
        bgm: 'wings'
      },
      {
        speaker: 'Оповідач',
        text: 'Коли під вечір підкошувалися ноги — вона лягала спати просто серед конюшини, не домиваючи посуд (Правило 3).',
        bg: 'flower_field_door',
        knightPose: 'none',
        fairyPose: 'no_wings',
        ambient: 'magic',
        bgm: 'wings'
      },
      {
        speaker: 'Оповідач',
        text: 'Сусідка скривилася на її гостинець — і фея більше не бігала до неї з пирогами (Правило 4). Дихати стало набагато легше.',
        bg: 'fairy_village',
        knightPose: 'none',
        fairyPose: 'happy_no_wings',
        ambient: 'magic',
        bgm: 'wings'
      },
      {
        speaker: 'Оповідач',
        text: 'Але перше й п\'яте правила здавалися непосильними.',
        bg: 'fairy_village',
        knightPose: 'none',
        fairyPose: 'no_wings',
        ambient: 'magic',
        bgm: 'wings'
      },
      {
        speaker: 'Оповідач',
        text: 'Одного разу старий Ельф попросив її пофарбувати свій будинок. Фея погодилася з доброти душі, набрала важких банок із яскравими фарбами й ледь тягнула їх по вулиці.',
        bg: 'fairy_street',
        knightPose: 'none',
        fairyPose: 'no_wings',
        ambient: 'magic',
        bgm: 'wings'
      },
      {
        speaker: 'Оповідач',
        text: 'Руки трусилися, відерця вислизали. На повороті з-за будинку вона з усього розмаху врізалася в когось високого й твердого!',
        bg: 'fairy_street',
        knightPose: 'hero',
        fairyPose: 'surprised_no_wings',
        ambient: 'magic',
        bgm: 'wings'
      },
      {
        speaker: 'Оповідач',
        text: 'Банки з гуркотом полетіли на бруківку, розливаючись синіми, зеленими й золотими калюжами.',
        bg: 'fairy_street',
        knightPose: 'hero',
        fairyPose: 'surprised_no_wings',
        ambient: 'magic',
        bgm: 'wings'
      },
      {
        speaker: 'Фея',
        text: '— Ой, лишенько, вибачте! — зойкнула фея і кинулася збирати фарбу з землі.',
        bg: 'fairy_street',
        knightPose: 'hero',
        fairyPose: 'surprised_no_wings',
        ambient: 'magic',
        bgm: 'wings'
      },
      {
        speaker: 'Лицар',
        text: '— Зачекай, ти не вдарилася? — пролунав глибокий, спокійний голос.',
        bg: 'fairy_street',
        knightPose: 'hero',
        fairyPose: 'surprised_no_wings',
        ambient: 'magic',
        bgm: 'wings'
      },
      {
        speaker: 'Оповідач',
        text: 'Перед нею на коліна опустився справжній Лицар у потертих дорожніх латах, проте на його правій руці не було залізної рукавиці — лише тепла людська долоня. Він одразу заходився піднімати важкі банки.',
        bg: 'fairy_street',
        knightPose: 'knee',
        fairyPose: 'no_wings',
        ambient: 'magic',
        bgm: 'wings'
      },
      {
        speaker: 'Фея',
        text: '— Я сама! Я можу сама, чесно, не треба! — за звичкою заторохтіла фея.',
        bg: 'fairy_street',
        knightPose: 'knee',
        fairyPose: 'no_wings',
        ambient: 'magic',
        bgm: 'wings'
      },
      {
        speaker: 'Оповідач',
        text: 'Лицар навіть не поворухнувся. Навпаки, він підхопив найбільші відра й посміхнувся:',
        bg: 'fairy_street',
        knightPose: 'hero',
        fairyPose: 'no_wings',
        ambient: 'magic',
        bgm: 'wings'
      },
      {
        speaker: 'Лицар',
        text: '— Навіщо самій, коли я тут? Я якраз повертався з академії, у мене повно вільного часу. Показуй дорогу!',
        bg: 'fairy_street',
        knightPose: 'hero',
        fairyPose: 'no_wings',
        ambient: 'magic',
        bgm: 'wings'
      },
      {
        speaker: 'Оповідач',
        text: 'Фея застигла. Вона згадала правило: «Важко? Звернися по допомогу». І вперше видихнула, дозволивши комусь іншому понести її вантаж.',
        bg: 'fairy_street',
        knightPose: 'hero',
        fairyPose: 'no_wings',
        ambient: 'magic',
        bgm: 'wings'
      },
      {
        speaker: 'Оповідач',
        text: 'Вони разом пофарбували будинок Ельфа — з жартами, мазками фарби на щоках і веселим сміхом. А надвечір, утомлені й задоволені, Лицар повів свого коня, і вони удвох пішли в поле.',
        bg: 'flower_field_door',
        knightPose: 'hero',
        fairyPose: 'happy_no_wings',
        ambient: 'magic',
        bgm: 'wings'
      },
      {
        speaker: 'Оповідач',
        text: 'Там, посеред шелесту колосків, знову стояли ті самі двері з віночком. Лицар і фея сіли на траву, притулившись спинами просто до теплих дощок.',
        bg: 'flower_field_door',
        knightPose: 'idle',
        fairyPose: 'no_wings',
        ambient: 'magic',
        bgm: 'wings'
      },
      {
        speaker: 'Фея',
        text: '— Як шкода, що в мене так і немає крил... Я стільки старалася, але нічого не вийшло.',
        bg: 'flower_field_door',
        knightPose: 'idle',
        fairyPose: 'no_wings',
        ambient: 'magic',
        bgm: 'wings'
      },
      {
        speaker: 'Лицар',
        text: '— Та ти що, не бачиш?! Он же вони — гарні, великі, білі, сяють у тебе за спиною!',
        bg: 'flower_field_door',
        knightPose: 'hero',
        fairyPose: 'no_wings',
        ambient: 'magic',
        bgm: 'wings'
      },
      {
        speaker: 'Оповідач',
        text: 'Фея озирнулася — і завмерла. Величні, невагомі крила з найчистішого білого світла тріпотіли за її плечима. Вони з\'явилися тоді, коли вона обрала себе і дозволила іншій душі розділити її втому.',
        bg: 'flower_field_door',
        knightPose: 'hero',
        fairyPose: 'sparkle',
        ambient: 'magic',
        bgm: 'wings'
      },
      {
        speaker: 'Оповідач',
        text: 'Вона торкнулася ручки дверей — і ті з легким клацанням розчинилися. За ними хлюпало безкрає синє море, про яке вона марила з самого дитинства.',
        bg: 'sea_sunset',
        knightPose: 'idle',
        fairyPose: 'hover',
        ambient: 'sunset_sparkles',
        bgm: 'sunset'
      },
      {
        speaker: 'Оповідач',
        text: 'Фея розправила крила й полетіла вперед над хвилями, а Лицар на своєму вірному жеребцеві помчав поруч береговою смугою, бризкаючи піною до самого заходу сонця.',
        bg: 'sea_sunset',
        knightPose: 'hero',
        fairyPose: 'hover',
        ambient: 'sunset_sparkles',
        bgm: 'sunset'
      }
    ]
  },
  {
    title: 'Глава 4. Після всіх казок...',
    lines: [
      {
        chapterTitle: 'ГЛАВА 4: ПІСЛЯ ВСІХ КАЗОК...',
        speaker: 'Оповідач',
        text: 'Минув рік відтоді, як вони переступили поріг і побудували свій дім на березі моря.',
        bg: 'cliff_proposal',
        knightPose: 'naked',
        fairyPose: 'hover',
        ambient: 'sunset_sparkles',
        bgm: 'sunset'
      },
      {
        speaker: 'Оповідач',
        text: 'Цього вечора сонце сідало особливо урочисто, заливаючи океан пурпуром і розплавленим золотом. Лицар попросив Фею прогулятися до скелі над водою — туди, де колись вони вперше влаштували пікнік.',
        bg: 'cliff_proposal',
        knightPose: 'naked',
        fairyPose: 'hover',
        ambient: 'sunset_sparkles',
        bgm: 'sunset'
      },
      {
        speaker: 'Оповідач',
        text: 'На вершині пагорба стояв стіл, прикрашений свічками у скляних ліхтариках і тими самими польовими квітами, які колись спліталися у віночок на дверях.',
        bg: 'cliff_proposal',
        knightPose: 'naked',
        fairyPose: 'hover',
        ambient: 'sunset_sparkles',
        bgm: 'sunset'
      },
      {
        speaker: 'Фея',
        text: '— Що це за свято, мій лицарю? Ми щось святкуємо?',
        bg: 'cliff_proposal',
        knightPose: 'naked',
        fairyPose: 'surprised',
        ambient: 'sunset_sparkles',
        bgm: 'sunset'
      },
      {
        speaker: 'Оповідач',
        text: 'Лицар підійшов до неї. На ньому не було лат — лише біла льняна сорочка, розстебнута біля шиї, і очі, які світилися ясніше за будь-який клинок. Він узяв її за тендітні руки.',
        bg: 'cliff_proposal',
        knightPose: 'naked',
        fairyPose: 'love',
        ambient: 'sunset_sparkles',
        bgm: 'sunset'
      },
      {
        speaker: 'Лицар',
        text: '— Коли я стояв у тому полі проти скаженого вітру, я думав, що моя сила — це здатність витримати шторм наодинці. Але ти показала мені, що найбільша сила — це довірити своє серце іншому.',
        bg: 'cliff_proposal',
        knightPose: 'naked',
        fairyPose: 'love',
        ambient: 'sunset_sparkles',
        bgm: 'sunset'
      },
      {
        speaker: 'Оповідач',
        text: 'Він повільно опустився на одне коліно.',
        bg: 'cliff_proposal',
        knightPose: 'knee_naked',
        fairyPose: 'surprised',
        ambient: 'sunset_sparkles',
        bgm: 'sunset'
      },
      {
        speaker: 'Оповідач',
        text: 'Фея притисла долоньки до вуст, відчуваючи, як у грудях солодко й швидко закалатало серце.',
        bg: 'cliff_proposal',
        knightPose: 'knee_naked',
        fairyPose: 'surprised',
        ambient: 'sunset_sparkles',
        bgm: 'sunset'
      },
      {
        speaker: 'Оповідач',
        text: 'Лицар дістав із кишені маленьку дерев\'яну коробочку, вирізану з уламка тих самих дверей, що колись подарували їм зустріч. Усередині тьмяно виблискувала витончена каблучка з білого золота, прикрашена краплею морського перламутру:',
        bg: 'cliff_proposal',
        knightPose: 'knee_naked',
        fairyPose: 'sparkle',
        ambient: 'sunset_sparkles',
        bgm: 'sunset',
        showRing: true
      },
      {
        speaker: 'Лицар',
        text: '— Ти навчила мене скидати броню. А я хочу все життя берегти твій політ і ніколи не давати твоїм крилам згаснути. Ти вийдеш за мене заміж?',
        bg: 'cliff_proposal',
        knightPose: 'knee_naked',
        fairyPose: 'sparkle',
        ambient: 'hearts',
        bgm: 'sunset',
        showRing: true,
        isProposal: true
      },
      {
        speaker: 'Оповідач',
        text: 'Сльози щастя бризнули з очей Феї. Вона не стрималася, кинулася йому на шию так, що вони обоє покотилися на м\'яку траву.',
        bg: 'cliff_proposal',
        knightPose: 'naked',
        fairyPose: 'love',
        ambient: 'hearts',
        bgm: 'sunset'
      },
      {
        speaker: 'Фея',
        text: '— Так! Так, так, тисячу разів так!',
        bg: 'cliff_proposal',
        knightPose: 'naked',
        fairyPose: 'love',
        ambient: 'hearts',
        bgm: 'sunset'
      },
      {
        speaker: 'Оповідач',
        text: 'Лицар підхопив її на руки і кружляв під першими вечірніми зорями, а її крила огорнули їх обох білосніжним наметом.',
        bg: 'cliff_proposal',
        knightPose: 'naked',
        fairyPose: 'love',
        ambient: 'hearts',
        bgm: 'sunset'
      },
      {
        speaker: 'Оповідач',
        text: '...А за місяць на цьому узбережжі гуляло все селище! Приїхав той самий учень Лицаря — уже з блискучим мечем і лицарським поясом, гордий за свого вчителя. Старий Ельф привіз у подарунок найкрасивішу різьблену гойдалку, вифарбувану в ті самі сині та золоті кольори. Маленькі феї кружляли в танку, розсипаючи іскри, а побратими-лицарі піднімали келихи з вином, сміялися і кричали гучні тости.',
        bg: 'wedding_beach',
        knightPose: 'naked',
        fairyPose: 'happy',
        apprenticePose: 'proud',
        ambient: 'fireworks',
        bgm: 'sunset'
      },
      {
        speaker: 'Оповідач',
        text: 'Коли настала ніч і над морем спалахнув святковий феєрверк, Лицар і Фея стояли біля води.',
        bg: 'wedding_beach',
        knightPose: 'naked',
        fairyPose: 'love',
        ambient: 'fireworks',
        bgm: 'sunset'
      },
      {
        speaker: 'Фея',
        text: '— Знаєш, — тихо сказала Фея, спираючись на плече свого вже законного чоловіка, — кажуть, що в казках буває лише один хепіенд, коли герої знаходять одне одного.',
        bg: 'wedding_beach',
        knightPose: 'naked',
        fairyPose: 'love',
        ambient: 'fireworks',
        bgm: 'sunset'
      },
      {
        speaker: 'Лицар',
        text: 'Лицар ніжно поцілував її у скроню, переплітаючи свої пальці з її пальчиками:',
        bg: 'wedding_beach',
        knightPose: 'naked',
        fairyPose: 'love',
        ambient: 'fireworks',
        bgm: 'sunset'
      },
      {
        speaker: 'Лицар',
        text: '— Нехай кажуть. Бо в нашої казки немає кінця. Відсьогодні в нас буде новий хепіенд кожного дня.',
        bg: 'wedding_beach',
        knightPose: 'naked',
        fairyPose: 'love',
        ambient: 'fireworks',
        bgm: 'sunset'
      },
      {
        speaker: 'Оповідач',
        text: 'І вони дивилися на зорі, тримаючись за руки, абсолютно вільні, крилаті й безмежно щасливі.',
        bg: 'wedding_beach',
        knightPose: 'naked',
        fairyPose: 'love',
        ambient: 'fireworks',
        bgm: 'sunset'
      }
    ]
  }
];
