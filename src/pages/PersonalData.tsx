export default function PersonalData() {
  return (
    <div className="min-h-screen bg-[#fafaf8] text-[#1a1a1a]" style={{ fontFamily: "'IBM Plex Sans', sans-serif" }}>
      <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;500;600&family=IBM+Plex+Serif:wght@400;600&display=swap" rel="stylesheet" />

      <div className="border-b border-[#e5e5e0] bg-white">
        <div className="max-w-3xl mx-auto px-6 py-8">
          <p className="text-xs uppercase tracking-widest text-[#999] mb-3">Юридический документ</p>
          <h1 className="text-3xl font-semibold text-[#1a1a1a] mb-1" style={{ fontFamily: "'IBM Plex Serif', serif" }}>
            Согласие на обработку персональных данных
          </h1>
          <p className="text-[#666] text-sm">в соответствии с Федеральным законом № 152-ФЗ «О персональных данных»</p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-12">

        <div className="mb-10 p-6 bg-white border border-[#e5e5e0] rounded-xl">
          <p className="text-[15px] leading-relaxed text-[#444]">
            Настоящим я, субъект персональных данных (далее — «Субъект»), свободно, своей волей и в своём интересе даю
            согласие индивидуальному предпринимателю <strong className="text-[#1a1a1a]">Савченко Ирине Игоревне</strong>,
            ИНН 911116164829, ОГРНИП 318911200074795 (далее — «Оператор»), расположенному по адресу:
            г. Керчь, ул. Циолковского, 12, на обработку моих персональных данных на условиях, изложенных ниже.
          </p>
        </div>

        {[
          {
            num: "1",
            title: "Перечень персональных данных",
            items: [
              "Фамилия, имя, отчество родителя (законного представителя).",
              "Имя и возраст ребёнка.",
              "Контактный номер телефона.",
              "Адрес электронной почты.",
              "Содержание обращений и сообщений, направленных через формы на сайте.",
              "Технические данные: IP-адрес, тип браузера, cookie-файлы, данные веб-аналитики (Яндекс.Метрика).",
            ],
          },
          {
            num: "2",
            title: "Цели обработки персональных данных",
            items: [
              "Обработка заявок на бронирование мест в детском клубе «Рыбка Долли».",
              "Связь с родителями (законными представителями) по вопросам бронирования, оплаты и расписания смен.",
              "Исполнение обязательств по договору публичной оферты.",
              "Ответы на вопросы и обращения, поступившие через формы обратной связи.",
              "Обработка отзывов о деятельности клуба.",
              "Обезличенный анализ посещаемости сайта в целях его улучшения.",
            ],
          },
          {
            num: "3",
            title: "Действия с персональными данными",
            items: [
              "Сбор, запись, систематизация, накопление, хранение.",
              "Уточнение (обновление, изменение).",
              "Использование в целях, указанных в разделе 2 настоящего согласия.",
              "Передача платёжному сервису ПАО «Робокасса» исключительно для обработки платежей.",
              "Передача сервису Яндекс.Метрика для обезличенного анализа посещаемости.",
              "Блокирование, обезличивание, уничтожение — по истечении срока хранения или при отзыве согласия.",
            ],
          },
          {
            num: "4",
            title: "Срок действия согласия",
            items: [
              "Настоящее согласие предоставляется на весь срок, необходимый для достижения указанных целей обработки, но не более 3 (трёх) лет с момента его предоставления.",
              "По истечении указанного срока согласие считается продлённым на тот же срок, если Субъект не отозвал его ранее.",
            ],
          },
          {
            num: "5",
            title: "Порядок отзыва согласия",
            items: [
              "Субъект вправе отозвать настоящее согласие в любой момент путём направления письменного уведомления на электронный адрес Оператора: ribkadolli@mail.ru.",
              "В уведомлении необходимо указать: ФИО, контактный телефон и формулировку «Отзыв согласия на обработку персональных данных».",
              "После получения отзыва Оператор прекращает обработку данных и уничтожает их в течение 30 (тридцати) дней, за исключением случаев, когда обработка обязательна по законодательству РФ.",
            ],
          },
          {
            num: "6",
            title: "Права субъекта персональных данных",
            items: [
              "Получать информацию о составе, целях и сроках обработки своих персональных данных.",
              "Требовать уточнения, блокирования или уничтожения данных в случае их неполноты, неточности или неправомерного получения.",
              "Обжаловать действия Оператора в Федеральную службу по надзору в сфере связи, информационных технологий и массовых коммуникаций (Роскомнадзор) или в судебном порядке.",
            ],
          },
        ].map((section) => (
          <div key={section.num} className="mb-10">
            <div className="flex items-baseline gap-4 mb-5">
              <span className="text-xs font-medium text-[#bbb] w-6 shrink-0">{section.num}.</span>
              <h2 className="text-lg font-semibold text-[#1a1a1a]" style={{ fontFamily: "'IBM Plex Serif', serif" }}>
                {section.title}
              </h2>
            </div>
            <div className="pl-10 space-y-3">
              {section.items.map((item, i) => (
                <div key={i} className="flex gap-3">
                  <span className="text-xs text-[#ccc] mt-1 shrink-0">{section.num}.{i + 1}</span>
                  <p className="text-[15px] leading-relaxed text-[#444]">{item}</p>
                </div>
              ))}
            </div>
          </div>
        ))}

        <div className="mb-10">
          <div className="flex items-baseline gap-4 mb-5">
            <span className="text-xs font-medium text-[#bbb] w-6 shrink-0">7.</span>
            <h2 className="text-lg font-semibold text-[#1a1a1a]" style={{ fontFamily: "'IBM Plex Serif', serif" }}>
              Реквизиты Оператора
            </h2>
          </div>
          <div className="pl-10">
            <div className="bg-white border border-[#e5e5e0] rounded-xl p-6 space-y-3">
              {[
                { label: "Оператор", value: "ИП Савченко Ирина Игоревна" },
                { label: "ИНН", value: "911116164829" },
                { label: "ОГРНИП", value: "318911200074795" },
                { label: "Адрес", value: "г. Керчь, ул. Циолковского, 12" },
                { label: "Телефон", value: "+7 988 152-16-98" },
                { label: "E-mail", value: "ribkadolli@mail.ru" },
                { label: "Сайт", value: "https://dolliklub.ru/" },
              ].map((r, i) => (
                <div key={i} className="flex gap-4 py-2 border-b border-[#f0f0ec] last:border-0">
                  <span className="text-[13px] text-[#999] w-44 shrink-0">{r.label}</span>
                  <span className="text-[15px] text-[#1a1a1a] font-medium">{r.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="p-5 bg-[#f5f5f0] rounded-xl border border-[#e5e5e0]">
          <p className="text-[13px] text-[#666] leading-relaxed">
            Настоящее согласие считается предоставленным с момента проставления отметки «Согласен с обработкой персональных данных» и отправки формы на сайте <a href="https://dolliklub.ru/" className="underline text-[#444]">dolliklub.ru</a>.
            Актуальная версия документа всегда доступна по адресу <a href="/personal-data" className="underline text-[#444]">dolliklub.ru/personal-data</a>.
          </p>
        </div>
      </div>

      <div className="border-t border-[#e5e5e0] bg-white">
        <div className="max-w-3xl mx-auto px-6 py-6 flex justify-between items-center flex-wrap gap-3">
          <span className="text-xs text-[#bbb]">© ИП Савченко Ирина Игоревна</span>
          <div className="flex gap-4">
            <a href="/privacy" className="text-xs text-[#999] hover:text-[#1a1a1a] transition-colors">Политика конфиденциальности</a>
            <a href="/" className="text-xs text-[#999] hover:text-[#1a1a1a] transition-colors">← На главную</a>
          </div>
        </div>
      </div>
    </div>
  );
}
