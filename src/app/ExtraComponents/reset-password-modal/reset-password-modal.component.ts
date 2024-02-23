import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AuthService, ResetPasswordRequest } from 'src/app/services/auth/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastService } from 'src/app/services/toast/toast.service';

@Component({
  selector: 'app-reset-password-modal',
  templateUrl: './reset-password-modal.component.html',
  styleUrls: ['./reset-password-modal.component.scss']
})
export class ResetPasswordModalComponent {
  resetPasswordForm: FormGroup;
  userId!: number;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private toastService: ToastService,
    public dialogRef: MatDialogRef<ResetPasswordModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.userId = data.userId;
    this.resetPasswordForm = this.formBuilder.group({
      currentPassword: ['', Validators.required],
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    if (this.resetPasswordForm.valid) {
      const { currentPassword, newPassword } = this.resetPasswordForm.value;
      this.resetPassword(currentPassword, newPassword);
    }
  }

  private resetPassword(currentPassword: string, newPassword: string) {
    const data: ResetPasswordRequest = {
      currentPassword: currentPassword,
      newPassword: newPassword
    };
  
    this.authService.resetPassword(this.userId, data).subscribe({
      next: (response) => {
        this.toastService.showSuccess('Contraseña actualizada con éxito');
        this.dialogRef.close();
      },
      error: (error) => {
        this.toastService.showError('Error al actualizar la contraseña');
      }
    });
  }
}
