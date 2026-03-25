type Props = {
	title: string;
	value: number;
	description: string;
};

export function StatCard({ title, value, description }: Props) {
	return (
		<div className='rounded-xl border border-gray-200 bg-white p-5 shadow-sm'>
			<p className='text-sm font-medium text-gray-500'>{title}</p>
			<p className='mt-2 text-3xl font-bold text-gray-900'>{value}</p>
			<p className='mt-2 text-sm text-gray-500'>{description}</p>
		</div>
	);
}
