import Grid from '../../components/shared/Grid';
import Column from '../../components/shared/Column';

const SignUpPage: React.FC = () => {
	return (
		<Grid cols={12} gap="1.5rem" style={{ height: '100vh' }}>
			<Column start={1} end={6}>
				<p>hi</p>
			</Column>
			<Column start={7}>
				<p>hi</p>
			</Column>
		</Grid>
	);
};

export default SignUpPage;
