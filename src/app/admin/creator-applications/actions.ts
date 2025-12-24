'use server';

import {
  approveApplication,
  rejectApplication,
} from '@/lib/creator-applications';
import { revalidatePath } from 'next/cache';

export async function handleApprove(
  applicationId: string,
  notes?: string
): Promise<{ success: boolean; error?: string }> {
  try {
    // In production, get these from the session
    const adminUserId = 'admin';
    const adminName = 'Admin';

    await approveApplication(applicationId, adminUserId, adminName, notes);
    revalidatePath('/admin/creator-applications');
    revalidatePath('/admin');
    return { success: true };
  } catch (error: any) {
    console.error('Error approving application:', error);
    return { success: false, error: error.message };
  }
}

export async function handleReject(
  applicationId: string,
  rejectionReason: string,
  notes?: string
): Promise<{ success: boolean; error?: string }> {
  try {
    // In production, get these from the session
    const adminUserId = 'admin';
    const adminName = 'Admin';

    await rejectApplication(
      applicationId,
      adminUserId,
      adminName,
      rejectionReason,
      notes
    );
    revalidatePath('/admin/creator-applications');
    revalidatePath('/admin');
    return { success: true };
  } catch (error: any) {
    console.error('Error rejecting application:', error);
    return { success: false, error: error.message };
  }
}
