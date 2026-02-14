export function ContractorsPage() {
  return (
    <section>
      <h2>Клиенты и поставщики</h2>
      <p>Страница покрывает CRUD контрагентов по ТЗ. Подключение API планируется в отдельном модуле.</p>
      <div className="grid-two">
        <article>
          <h3>Клиенты</h3>
          <form className="stacked-form">
            <input placeholder="Наименование клиента" />
            <input placeholder="Телефон" />
            <input placeholder="Адрес" />
            <button type="button">Сохранить клиента</button>
          </form>
        </article>
        <article>
          <h3>Поставщики</h3>
          <form className="stacked-form">
            <input placeholder="Наименование поставщика" />
            <input placeholder="Телефон" />
            <button type="button">Сохранить поставщика</button>
          </form>
        </article>
      </div>
    </section>
  );
}
