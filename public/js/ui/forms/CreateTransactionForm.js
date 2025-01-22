/**
 * Класс CreateTransactionForm управляет формой
 * создания новой транзакции
 * */
class CreateTransactionForm extends AsyncForm {
  /**
   * Вызывает родительский конструктор и
   * метод renderAccountsList
   * */
  constructor(element) {
    super(element);
    this.renderAccountsList();
  }

  /**
   * Получает список счетов с помощью Account.list
   * Обновляет в форме всплывающего окна выпадающий список
   * */
  renderAccountsList() {
    const user = User.current();
    if (user && this.element) {
      Account.list(user, (err, response) => {
        if (response.success) {
          const data = response.data;
          const select = this.element.querySelector('select');

          data.forEach((account) => {
            const exists = select.querySelector(`option[value="${account.id}"]`);
            if (!exists) {
              select.insertAdjacentHTML(
                'beforeend',
                `<option value="${account.id}">${account.name}</option>`
              );
            }
          });
        }
      });
    }
  }

  /**
   * Создаёт новую транзакцию (доход или расход)
   * с помощью Transaction.create. По успешному результату
   * вызывает App.update(), сбрасывает форму и закрывает окно,
   * в котором находится форма
   * */
  onSubmit(data) {
    Transaction.create(data, (err, response) => {
      if (response.success) {
        this.element.reset();
        App.update();
        App.getModal('newIncome').close();
        App.getModal('newExpense').close();
      }
    });
  }
}
