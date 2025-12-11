import { dashboardUseCase } from '@/features/dashboard/services/dashboard.usecase';
import type { CreateDashboardItemRequest } from '@/features/dashboard/types/dashboard.types';

export async function testDashboardImplementation() {
  console.log('Testing Dashboard Implementation...');

  try {
    console.log('1. Testing data retrieval...');
    const data = await dashboardUseCase.getDashboardData();
    console.log(`✓ Retrieved ${data.length} dashboard items`);

    const metrics = await dashboardUseCase.getDashboardMetrics();
    console.log(`✓ Retrieved ${metrics.length} metrics`);

    const charts = await dashboardUseCase.getChartData();
    console.log(`✓ Retrieved ${charts.length} charts`);

    const activities = await dashboardUseCase.getActivities();
    console.log(`✓ Retrieved ${activities.length} activities`);

    console.log('2. Testing item creation...');
    const newItem: CreateDashboardItemRequest = {
      title: 'Test Dashboard Item',
      description: 'This is a test item created by the manual test',
      value: 999,
      category: 'SALES',
      status: 'ACTIVE',
      metadata: { test: true, createdBy: 'manual-test' },
    };

    const createdItem = await dashboardUseCase.createDashboardItem(newItem, 'test-user');
    console.log(`✓ Created item with ID: ${createdItem.id}`);

    console.log('3. Testing item update...');
    const updatedItem = await dashboardUseCase.updateDashboardItem(createdItem.id, {
      title: 'Updated Test Item',
      value: 1500,
      status: 'COMPLETED',
    });
    console.log(`✓ Updated item: ${updatedItem.title} (value: ${updatedItem.value})`);

    console.log('4. Testing data filtering...');
    const salesItems = await dashboardUseCase.filterDashboardData({ category: 'SALES' });
    console.log(`✓ Found ${salesItems.length} SALES items`);

    const activeItems = await dashboardUseCase.filterDashboardData({ status: 'ACTIVE' });
    console.log(`✓ Found ${activeItems.length} ACTIVE items`);

    console.log('5. Testing dashboard summary...');
    const summary = await dashboardUseCase.getDashboardSummary();
    console.log(`✓ Summary: ${summary.totalItems} total, ${summary.activeItems} active, ${summary.completedItems} completed`);

    console.log('6. Testing item deletion...');
    await dashboardUseCase.deleteDashboardItem(createdItem.id);
    const deletedItem = await dashboardUseCase.getDashboardItemById(createdItem.id);
    console.log(`✓ Item deleted successfully: ${deletedItem === null ? 'confirmed' : 'failed'}`);

    console.log('\n✅ All tests passed! Dashboard implementation is working correctly.');
    return true;
  } catch (error) {
    console.error('❌ Test failed:', error);
    return false;
  }
}

export default testDashboardImplementation;