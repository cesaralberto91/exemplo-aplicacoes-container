import { Component } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  public user: any = {};
  public users: any[] = [];

  constructor(private userService: UserService, private toastController: ToastController) {
    this.search();
  }

  private async exibirMensagem(mensagem: string) {
    const toast = await this.toastController.create({
      message: mensagem,
      duration: 1500,
      position: "bottom",
    });

    await toast.present();
  }

  create() {
    if (this.user.nome != null && this.user.salario > 0) {
      this.userService.create(this.user)
        .then((resul) => {
          console.log(resul);
          this.exibirMensagem("Usuário cadastrado.");
          this.user = {};
          this.search();
        })
    } else {
      this.exibirMensagem("Preencha todos os campos do formulário.");
    }
  }

  delete(id: number) {
    this.userService.delete(id)
      .then((result: any) => {
        console.log(result);
        this.exibirMensagem(`Usuário excluído.`);
        this.search();
      })
  }

  search() {
    this.userService.getAll()
      .then((result: any) => {
        console.log(result);
        this.users = result;
      })
  }

}
