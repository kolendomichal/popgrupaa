"""user_id_in_cluster_node

Revision ID: 8fa29ae8d4f1
Revises: c13c78ae550e
Create Date: 2019-12-01 14:46:23.402682

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '8fa29ae8d4f1'
down_revision = 'c13c78ae550e'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('ClusterNodes', sa.Column('user_id', sa.Integer(), nullable=False))
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('ClusterNodes', 'user_id')
    # ### end Alembic commands ###